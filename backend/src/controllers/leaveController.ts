import { Request, Response } from 'express';
import { LeaveService } from '../services/leaveService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export class LeaveController {
  static async createLeaveRequest(req: AuthRequest, res: Response) {
    try {
      const leave = await LeaveService.createLeaveRequest(req.user!._id.toString(), req.body);
      return sendSuccess(res, 'Gửi đơn xin nghỉ phép thành công', leave, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Gửi đơn thất bại', error, 400);
    }
  }

  static async getMyLeaveRequests(req: AuthRequest, res: Response) {
    try {
      const list = await LeaveService.getMyLeaveRequests(req.user!._id.toString());
      return sendSuccess(res, 'Lấy danh sách đơn nghỉ phép của bạn thành công', list);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách đơn', error, 400);
    }
  }

  static async getAllLeaveRequests(req: Request, res: Response) {
    try {
      const list = await LeaveService.getAllLeaveRequests(req.query.status as string);
      return sendSuccess(res, 'Lấy toàn bộ đơn nghỉ phép thành công', list);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách đơn', error, 400);
    }
  }

  static async approveLeaveRequest(req: AuthRequest, res: Response) {
    try {
      const leave = await LeaveService.processLeaveRequest(
        req.params.id,
        req.user!._id.toString(),
        'approved',
        req.body.responseNote
      );
      return sendSuccess(res, 'Duyệt đơn nghỉ phép thành công', leave);
    } catch (error: any) {
      return sendError(res, error.message || 'Duyệt đơn thất bại', error, 400);
    }
  }

  static async rejectLeaveRequest(req: AuthRequest, res: Response) {
    try {
      const leave = await LeaveService.processLeaveRequest(
        req.params.id,
        req.user!._id.toString(),
        'rejected',
        req.body.responseNote
      );
      return sendSuccess(res, 'Từ chối đơn nghỉ phép thành công', leave);
    } catch (error: any) {
      return sendError(res, error.message || 'Từ chối đơn thất bại', error, 400);
    }
  }

  static async cancelLeaveRequest(req: AuthRequest, res: Response) {
    try {
      const leave = await LeaveService.cancelLeaveRequest(req.params.id, req.user!._id.toString());
      return sendSuccess(res, 'Hủy đơn nghỉ phép thành công', leave);
    } catch (error: any) {
      return sendError(res, error.message || 'Hủy đơn thất bại', error, 400);
    }
  }
}
