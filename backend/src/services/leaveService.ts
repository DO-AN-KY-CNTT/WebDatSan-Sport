import { LeaveRequest, ILeaveRequest } from '../models/LeaveRequest';
import { Employee } from '../models/Employee';
import { LeaveType } from '../types';

export class LeaveService {
  static async createLeaveRequest(
    userId: string,
    data: {
      startDate: string;
      endDate: string;
      type: LeaveType;
      reason: string;
    }
  ) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Tài khoản của bạn chưa được liên kết với hồ sơ nhân viên');
    }

    // Chống tạo đơn trùng thời gian với đơn đã được duyệt hoặc đang chờ duyệt
    const existing = await LeaveRequest.findOne({
      employee: employee._id,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { startDate: { $lte: data.endDate }, endDate: { $gte: data.startDate } },
      ],
    });

    if (existing) {
      throw new Error(
        `Bạn đã có một đơn nghỉ phép (${existing.startDate} đến ${existing.endDate}) đang trong khoảng thời gian này`
      );
    }

    const leave = await LeaveRequest.create({
      employee: employee._id,
      startDate: data.startDate,
      endDate: data.endDate,
      type: data.type,
      reason: data.reason,
      status: 'pending',
    });

    return await LeaveRequest.findById(leave._id).populate(
      'employee',
      'employeeCode fullName position department'
    );
  }

  static async getMyLeaveRequests(userId: string) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Tài khoản của bạn chưa được liên kết với hồ sơ nhân viên');
    }

    return await LeaveRequest.find({ employee: employee._id })
      .populate('approvedBy', 'fullName email')
      .sort({ createdAt: -1 });
  }

  static async getAllLeaveRequests(status?: string) {
    const filter: any = {};
    if (status && status !== 'all') filter.status = status;

    return await LeaveRequest.find(filter)
      .populate('employee', 'employeeCode fullName department position avatar')
      .populate('approvedBy', 'fullName email')
      .sort({ createdAt: -1 });
  }

  static async processLeaveRequest(
    leaveId: string,
    reviewerUserId: string,
    action: 'approved' | 'rejected',
    responseNote?: string
  ) {
    const leave = await LeaveRequest.findById(leaveId);
    if (!leave) {
      throw new Error('Không tìm thấy đơn xin nghỉ phép');
    }

    if (leave.status !== 'pending') {
      throw new Error(`Đơn xin nghỉ phép đã được xử lý trước đó với trạng thái: ${leave.status}`);
    }

    leave.status = action;
    leave.approvedBy = reviewerUserId as any;
    leave.approvedAt = new Date();
    if (responseNote) leave.responseNote = responseNote;

    await leave.save();
    return await LeaveRequest.findById(leave._id)
      .populate('employee', 'employeeCode fullName department position')
      .populate('approvedBy', 'fullName email');
  }

  static async cancelLeaveRequest(leaveId: string, userId: string) {
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error('Không tìm thấy hồ sơ nhân viên');
    }

    const leave = await LeaveRequest.findById(leaveId);
    if (!leave) {
      throw new Error('Không tìm thấy đơn xin nghỉ');
    }

    if (leave.employee.toString() !== employee._id.toString()) {
      throw new Error('Bạn không thể hủy đơn nghỉ phép của người khác');
    }

    if (leave.status !== 'pending') {
      throw new Error('Chỉ có thể hủy đơn đang ở trạng thái chờ duyệt (pending)');
    }

    leave.status = 'cancelled';
    await leave.save();
    return leave;
  }
}
