import { Payroll, IPayroll } from '../models/Payroll';
import { Employee } from '../models/Employee';
import { Attendance } from '../models/Attendance';
import { PayrollStatus } from '../types';

export class PayrollService {
  /**
   * Tính toán hoặc cập nhật bảng lương cho 1 nhân viên trong tháng
   */
  static async calculateEmployeePayroll(data: {
    employeeId: string;
    month: number;
    year: number;
    allowance?: number;
    overtimePay?: number;
    deduction?: number;
    notes?: string;
  }) {
    const employee = await Employee.findById(data.employeeId);
    if (!employee) {
      throw new Error('Không tìm thấy nhân viên');
    }

    const monthStr = data.month < 10 ? `0${data.month}` : `${data.month}`;
    const datePrefix = `${data.year}-${monthStr}`;

    // Lấy các bản ghi chấm công thực tế trong tháng
    const attendances = await Attendance.find({
      employee: data.employeeId,
      date: { $regex: `^${datePrefix}` },
      checkIn: { $exists: true },
      checkOut: { $exists: true },
    });

    const totalWorkDays = attendances.length;
    const totalWorkHours = attendances.reduce((acc, cur) => acc + (cur.workHours || 0), 0);

    const baseSalary = employee.salary;
    const standardDays = 26; // Chuẩn 26 ngày công / tháng
    const allowance = data.allowance || 0;
    const overtimePay = data.overtimePay || 0;
    const deduction = data.deduction || 0;

    // Lương theo ngày công thực tế + Phụ cấp + Tăng ca - Khấu trừ
    const workPay = Math.round((baseSalary / standardDays) * totalWorkDays);
    const totalSalary = Math.max(0, workPay + allowance + overtimePay - deduction);

    // Upsert bảng lương
    const payroll = await Payroll.findOneAndUpdate(
      {
        employee: data.employeeId,
        month: data.month,
        year: data.year,
      },
      {
        baseSalary,
        totalWorkDays,
        totalWorkHours: Math.round(totalWorkHours * 10) / 10,
        allowance,
        overtimePay,
        deduction,
        totalSalary,
        status: 'draft',
        notes: data.notes || '',
      },
      { upsert: true, new: true, runValidators: true }
    ).populate('employee', 'employeeCode fullName position department');

    return payroll;
  }

  static async getAllPayrolls(query: { month?: number; year?: number; employeeId?: string }) {
    const filter: any = {};
    if (query.month) filter.month = Number(query.month);
    if (query.year) filter.year = Number(query.year);
    if (query.employeeId) filter.employee = query.employeeId;

    return await Payroll.find(filter)
      .populate('employee', 'employeeCode fullName position department avatar salary')
      .sort({ year: -1, month: -1 });
  }

  static async getPayrollById(id: string) {
    const payroll = await Payroll.findById(id).populate(
      'employee',
      'employeeCode fullName position department avatar salary'
    );
    if (!payroll) throw new Error('Không tìm thấy bảng lương');
    return payroll;
  }

  static async updatePayroll(id: string, data: Partial<IPayroll>) {
    const payroll = await Payroll.findById(id);
    if (!payroll) throw new Error('Không tìm thấy bảng lương');

    if (data.allowance !== undefined) payroll.allowance = data.allowance;
    if (data.overtimePay !== undefined) payroll.overtimePay = data.overtimePay;
    if (data.deduction !== undefined) payroll.deduction = data.deduction;
    if (data.status) payroll.status = data.status;
    if (data.notes !== undefined) payroll.notes = data.notes;

    // Recalculate total salary
    const standardDays = 26;
    const workPay = Math.round((payroll.baseSalary / standardDays) * payroll.totalWorkDays);
    payroll.totalSalary = Math.max(
      0,
      workPay + payroll.allowance + payroll.overtimePay - payroll.deduction
    );

    await payroll.save();
    return await Payroll.findById(payroll._id).populate(
      'employee',
      'employeeCode fullName position department avatar'
    );
  }
}
