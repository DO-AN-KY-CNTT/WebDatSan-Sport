import { Employee, IEmployee } from '../models/Employee';
import { User } from '../models/User';
import { Attendance } from '../models/Attendance';
import { LeaveRequest } from '../models/LeaveRequest';

export class EmployeeService {
  static async getAllEmployees(query: {
    search?: string;
    position?: string;
    department?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const filter: any = {};
    if (query.position) filter.position = query.position;
    if (query.department) filter.department = new RegExp(query.department, 'i');
    if (query.status) filter.status = query.status;

    if (query.search) {
      const regex = new RegExp(query.search, 'i');
      filter.$or = [
        { fullName: regex },
        { employeeCode: regex },
        { email: regex },
        { phone: regex },
      ];
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const [employees, total] = await Promise.all([
      Employee.find(filter)
        .populate('user', 'email role isActive mustChangePassword')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Employee.countDocuments(filter),
    ]);

    return {
      employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getEmployeeById(id: string) {
    const employee = await Employee.findById(id).populate(
      'user',
      'email role isActive mustChangePassword'
    );
    if (!employee) {
      throw new Error('Không tìm thấy nhân viên');
    }

    // Tính toán thống kê chấm công thực tế
    const [attendances, leaveCount] = await Promise.all([
      Attendance.find({ employee: id }),
      LeaveRequest.countDocuments({ employee: id, status: 'approved' }),
    ]);

    let totalWorkDays = 0;
    let totalWorkHours = 0;
    let lateDays = 0;
    let absentDays = 0;

    for (const att of attendances) {
      if (att.checkIn && att.checkOut) {
        totalWorkDays += 1;
        totalWorkHours += att.workHours || 0;
      }
      if (att.status === 'late') lateDays += 1;
      if (att.status === 'absent') absentDays += 1;
    }

    return {
      employee,
      stats: {
        totalWorkDays,
        totalWorkHours: Math.round(totalWorkHours * 10) / 10,
        lateDays,
        absentDays,
        approvedLeaveDays: leaveCount,
      },
      recentAttendances: attendances.slice(-10).reverse(),
    };
  }

  static async createEmployee(data: any) {
    const existingCode = await Employee.findOne({
      employeeCode: data.employeeCode.toUpperCase(),
    });
    if (existingCode) {
      throw new Error(`Mã nhân viên ${data.employeeCode} đã tồn tại`);
    }

    const existingEmail = await Employee.findOne({
      email: data.email.toLowerCase(),
    });
    if (existingEmail) {
      throw new Error(`Email ${data.email} đã được sử dụng cho nhân viên khác`);
    }

    let linkedUserId: any = null;

    if (data.createUserAccount) {
      const existingUser = await User.findOne({ email: data.email.toLowerCase() });
      if (existingUser) {
        throw new Error(`Tài khoản User với email ${data.email} đã tồn tại trong hệ thống`);
      }

      const role = data.position === 'manager' ? 'manager' : 'staff';
      const defaultPass = data.temporaryPassword || 'Staff@123456';

      const newUser = await User.create({
        email: data.email.toLowerCase(),
        password: defaultPass,
        fullName: data.fullName,
        phone: data.phone,
        avatar: data.avatar,
        role,
        isActive: data.status === 'active',
        mustChangePassword: true,
      });

      linkedUserId = newUser._id;
    }

    const employee = await Employee.create({
      ...data,
      employeeCode: data.employeeCode.toUpperCase(),
      email: data.email.toLowerCase(),
      user: linkedUserId,
    });

    return await Employee.findById(employee._id).populate('user');
  }

  static async updateEmployee(id: string, data: Partial<IEmployee>) {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).populate('user');

    if (!employee) {
      throw new Error('Không tìm thấy nhân viên');
    }

    // Đồng bộ trạng thái User nếu nhân viên bị tạm khóa
    if (data.status && employee.user) {
      const isActive = data.status === 'active';
      await User.findByIdAndUpdate(employee.user, { isActive });
    }

    return employee;
  }

  static async updateStatus(id: string, status: string) {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    ).populate('user');

    if (!employee) {
      throw new Error('Không tìm thấy nhân viên');
    }

    if (employee.user) {
      const isActive = status === 'active';
      await User.findByIdAndUpdate(employee.user, { isActive });
    }

    return employee;
  }

  static async deleteEmployee(id: string) {
    // Kiểm tra nếu nhân viên đã có dữ liệu chấm công -> Không xóa cứng
    const attendanceCount = await Attendance.countDocuments({ employee: id });
    if (attendanceCount > 0) {
      throw new Error(
        `Nhân viên đã có ${attendanceCount} bản ghi chấm công. Để đảm bảo tính toàn vẹn dữ liệu, vui lòng chuyển trạng thái sang "Đã nghỉ việc" (terminated) thay vì xóa cứng!`
      );
    }

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      throw new Error('Không tìm thấy nhân viên');
    }

    if (employee.user) {
      await User.findByIdAndDelete(employee.user);
    }

    return employee;
  }
}
