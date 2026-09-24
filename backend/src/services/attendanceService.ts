import crypto from 'crypto';
import QRCode from 'qrcode';
import { Attendance, IAttendance } from '../models/Attendance';
import { AttendanceLog } from '../models/AttendanceLog';
import { WorkSchedule } from '../models/WorkSchedule';
import { Shift } from '../models/Shift';
import { Employee } from '../models/Employee';
import { QrToken } from '../models/QrToken';
import { timeToMinutes } from './bookingService';
import { AttendanceStatus } from '../types';

export class AttendanceService {
  /**
   * Chấm công vào (Check-in)
   */
  static async checkIn(
    userId: string,
    data: { workScheduleId: string; note?: string; qrToken?: string }
  ) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Tài khoản của bạn chưa được liên kết với hồ sơ nhân viên');
    }

    const schedule = await WorkSchedule.findById(data.workScheduleId).populate('shift');
    if (!schedule) {
      throw new Error('Không tìm thấy lịch làm việc');
    }

    if (schedule.employee.toString() !== employee._id.toString()) {
      throw new Error('Lịch làm việc này không thuộc về bạn');
    }

    // Kiểm tra không được check-in nhiều lần
    let attendance = await Attendance.findOne({
      employee: employee._id,
      workSchedule: schedule._id,
    });

    if (attendance && attendance.checkIn) {
      throw new Error('Bạn đã chấm công vào (check-in) cho ca này rồi');
    }

    let qrVerified = false;
    if (data.qrToken) {
      const tokenDoc = await QrToken.findOne({
        code: data.qrToken,
        isActive: true,
        expiresAt: { $gt: new Date() },
      });
      if (!tokenDoc) {
        throw new Error('Mã QR không hợp lệ hoặc đã hết hạn. Vui lòng quét lại!');
      }
      qrVerified = true;
    }

    const now = new Date();
    const shift = schedule.shift as any;

    // Phân tích trạng thái Đi Muộn (Late) theo gracePeriod
    let status: AttendanceStatus = 'present';
    if (shift && shift.startTime) {
      const shiftStartMin = timeToMinutes(shift.startTime);
      const graceMin = shift.gracePeriod || 15;
      const currentMin = now.getHours() * 60 + now.getMinutes();

      if (currentMin > shiftStartMin + graceMin) {
        status = 'late';
      }
    }

    if (!attendance) {
      attendance = new Attendance({
        employee: employee._id,
        workSchedule: schedule._id,
        date: schedule.date,
        checkIn: now,
        status,
        note: data.note || '',
        qrVerified,
      });
    } else {
      attendance.checkIn = now;
      attendance.status = status;
      attendance.qrVerified = qrVerified;
      if (data.note) attendance.note = data.note;
    }

    await attendance.save();

    // Ghi nhận Audit Log
    await AttendanceLog.create({
      attendance: attendance._id,
      action: 'check_in',
      newValue: { checkIn: now, status, qrVerified },
      performedBy: userId,
      reason: 'Nhân viên tự chấm công vào',
    });

    return await Attendance.findById(attendance._id)
      .populate('employee', 'fullName employeeCode')
      .populate({
        path: 'workSchedule',
        populate: [{ path: 'shift' }, { path: 'court' }],
      });
  }

  /**
   * Chấm công ra (Check-out) & tính toán giờ làm tự động
   */
  static async checkOut(userId: string, data: { attendanceId: string; note?: string }) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Tài khoản của bạn chưa được liên kết với hồ sơ nhân viên');
    }

    const attendance = await Attendance.findById(data.attendanceId).populate({
      path: 'workSchedule',
      populate: { path: 'shift' },
    });

    if (!attendance) {
      throw new Error('Không tìm thấy thông tin chấm công');
    }

    if (attendance.employee.toString() !== employee._id.toString()) {
      throw new Error('Bản ghi chấm công này không thuộc về bạn');
    }

    if (!attendance.checkIn) {
      throw new Error('Bạn chưa chấm công vào (check-in) nên không thể chấm công ra (check-out)');
    }

    if (attendance.checkOut) {
      throw new Error('Bạn đã chấm công ra (check-out) cho ca này rồi');
    }

    const now = new Date();
    attendance.checkOut = now;

    // Tính giờ làm việc: checkOut - checkIn - breakTime
    const diffMs = now.getTime() - attendance.checkIn.getTime();
    let totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

    const schedule = attendance.workSchedule as any;
    const shift = schedule?.shift;

    // Trừ thời gian nghỉ giữa ca nếu ca có giờ nghỉ
    if (shift && shift.breakStart && shift.breakEnd) {
      const breakStartMin = timeToMinutes(shift.breakStart);
      const breakEndMin = timeToMinutes(shift.breakEnd);
      const breakDuration = Math.max(0, breakEndMin - breakStartMin);

      // Nếu tổng thời gian làm việc lớn hơn thời gian nghỉ thì khấu trừ
      if (totalMinutes > breakDuration) {
        totalMinutes -= breakDuration;
      }
    }

    attendance.workHours = Math.round((totalMinutes / 60) * 100) / 100;
    if (data.note) {
      attendance.note = attendance.note ? `${attendance.note}; ${data.note}` : data.note;
    }

    await attendance.save();

    // Ghi nhận Audit Log
    await AttendanceLog.create({
      attendance: attendance._id,
      action: 'check_out',
      newValue: { checkOut: now, workHours: attendance.workHours },
      performedBy: userId,
      reason: 'Nhân viên tự chấm công ra',
    });

    return attendance;
  }

  /**
   * Lấy lịch sử chấm công cá nhân
   */
  static async getMyAttendances(userId: string, query: { date?: string; month?: number; year?: number }) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Tài khoản của bạn chưa được liên kết với hồ sơ nhân viên');
    }

    const filter: any = { employee: employee._id };
    if (query.date) filter.date = query.date;

    return await Attendance.find(filter)
      .populate({
        path: 'workSchedule',
        populate: [{ path: 'shift' }, { path: 'court' }],
      })
      .sort({ date: -1 });
  }

  /**
   * Admin / Manager quản lý toàn bộ chấm công
   */
  static async getAllAttendances(params: {
    employeeId?: string;
    date?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const filter: any = {};
    if (params.employeeId) filter.employee = params.employeeId;
    if (params.date) filter.date = params.date;
    if (params.status) filter.status = params.status;

    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 20));
    const skip = (page - 1) * limit;

    const [attendances, total] = await Promise.all([
      Attendance.find(filter)
        .populate('employee', 'employeeCode fullName department position avatar')
        .populate({
          path: 'workSchedule',
          populate: [{ path: 'shift' }, { path: 'court', select: 'name' }],
        })
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Attendance.countDocuments(filter),
    ]);

    return {
      attendances,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Admin / Manager chỉnh sửa chấm công kèm Audit Log bắt buộc
   */
  static async adminUpdateAttendance(
    attendanceId: string,
    adminUserId: string,
    data: { checkIn?: string; checkOut?: string; status?: AttendanceStatus; reason: string }
  ) {
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      throw new Error('Không tìm thấy bản ghi chấm công');
    }

    const oldValue = {
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      workHours: attendance.workHours,
      status: attendance.status,
    };

    if (data.checkIn) attendance.checkIn = new Date(data.checkIn);
    if (data.checkOut) attendance.checkOut = new Date(data.checkOut);
    if (data.status) attendance.status = data.status;

    // Tính lại workHours nếu cả checkIn và checkOut đều có
    if (attendance.checkIn && attendance.checkOut) {
      const diffMs = attendance.checkOut.getTime() - attendance.checkIn.getTime();
      const mins = Math.max(0, Math.floor(diffMs / (1000 * 60)));
      attendance.workHours = Math.round((mins / 60) * 100) / 100;
    }

    await attendance.save();

    // Bắt buộc ghi nhận Audit Log
    await AttendanceLog.create({
      attendance: attendance._id,
      action: 'admin_override',
      oldValue,
      newValue: {
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
        workHours: attendance.workHours,
        status: attendance.status,
      },
      performedBy: adminUserId,
      reason: data.reason,
    });

    return attendance;
  }

  /**
   * Lấy Audit Logs của 1 bản ghi chấm công
   */
  static async getAttendanceAuditLogs(attendanceId: string) {
    return await AttendanceLog.find({ attendance: attendanceId })
      .populate('performedBy', 'fullName email role')
      .sort({ createdAt: -1 });
  }

  /**
   * Tạo mã QR Token chấm công động cho sân
   */
  static async generateQrCode(courtId: string, expiresInMinutes: number = 60) {
    const code = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    await QrToken.create({
      court: courtId,
      code,
      expiresAt,
      isActive: true,
    });

    // Tạo QR Code Data URL dạng PNG
    const qrData = JSON.stringify({ courtId, qrToken: code, expiresAt: expiresAt.toISOString() });
    const qrDataUrl = await QRCode.toDataURL(qrData, { width: 300, margin: 2 });

    return {
      courtId,
      code,
      expiresAt,
      qrDataUrl,
    };
  }
}
