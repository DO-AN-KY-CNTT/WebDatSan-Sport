import { WorkSchedule, IWorkSchedule } from '../models/WorkSchedule';
import { Employee } from '../models/Employee';
import { Shift } from '../models/Shift';

export class WorkScheduleService {
  static async getAllSchedules(query: {
    employeeId?: string;
    shiftId?: string;
    courtId?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const filter: any = {};
    if (query.employeeId) filter.employee = query.employeeId;
    if (query.shiftId) filter.shift = query.shiftId;
    if (query.courtId) filter.court = query.courtId;
    if (query.date) filter.date = query.date;

    if (query.startDate && query.endDate) {
      filter.date = { $gte: query.startDate, $lte: query.endDate };
    }

    return await WorkSchedule.find(filter)
      .populate('employee', 'employeeCode fullName email phone position department')
      .populate('shift')
      .populate('court', 'name address location')
      .sort({ date: 1, 'shift.startTime': 1 });
  }

  static async getMySchedules(userId: string, startDate?: string, endDate?: string) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Tài khoản của bạn chưa được liên kết với hồ sơ nhân viên');
    }

    const filter: any = { employee: employee._id };
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }

    return await WorkSchedule.find(filter)
      .populate('shift')
      .populate('court', 'name address location')
      .sort({ date: 1 });
  }

  static async createSchedule(data: {
    employeeId: string;
    shiftId: string;
    courtId?: string;
    date: string;
    note?: string;
    createdBy: string;
  }) {
    const [employee, shift] = await Promise.all([
      Employee.findById(data.employeeId),
      Shift.findById(data.shiftId),
    ]);

    if (!employee) throw new Error('Không tìm thấy nhân viên');
    if (!shift) throw new Error('Không tìm thấy ca làm việc');

    // Chống phân trùng ca cho nhân viên trong cùng 1 ngày
    const existing = await WorkSchedule.findOne({
      employee: data.employeeId,
      date: data.date,
      shift: data.shiftId,
      status: { $ne: 'cancelled' },
    });

    if (existing) {
      throw new Error(
        `Nhân viên ${employee.fullName} đã được phân ${shift.name} vào ngày ${data.date} rồi`
      );
    }

    const schedule = await WorkSchedule.create({
      employee: data.employeeId,
      shift: data.shiftId,
      court: data.courtId || undefined,
      date: data.date,
      note: data.note || '',
      createdBy: data.createdBy,
    });

    return await WorkSchedule.findById(schedule._id)
      .populate('employee', 'employeeCode fullName position')
      .populate('shift')
      .populate('court', 'name');
  }

  static async updateSchedule(id: string, data: Partial<IWorkSchedule>) {
    const schedule = await WorkSchedule.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    )
      .populate('employee', 'employeeCode fullName position')
      .populate('shift')
      .populate('court', 'name');

    if (!schedule) throw new Error('Không tìm thấy lịch làm việc');
    return schedule;
  }

  static async deleteSchedule(id: string) {
    const schedule = await WorkSchedule.findByIdAndDelete(id);
    if (!schedule) throw new Error('Không tìm thấy lịch làm việc');
    return schedule;
  }
}
