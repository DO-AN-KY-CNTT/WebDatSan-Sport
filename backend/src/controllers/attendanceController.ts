import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendanceService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export class AttendanceController {
  static async checkIn(req: AuthRequest, res: Response) {
    try {
      const attendance = await AttendanceService.checkIn(req.user!._id.toString(), req.body);
      return sendSuccess(res, 'Chấm công vào thành công', attendance, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Chấm công vào thất bại', error, 400);
    }
  }

  static async checkOut(req: AuthRequest, res: Response) {
    try {
      const attendance = await AttendanceService.checkOut(req.user!._id.toString(), req.body);
      return sendSuccess(res, 'Chấm công ra thành công. Hoàn tất ca làm!', attendance);
    } catch (error: any) {
      return sendError(res, error.message || 'Chấm công ra thất bại', error, 400);
    }
  }

  static async getMyAttendances(req: AuthRequest, res: Response) {
    try {
      const list = await AttendanceService.getMyAttendances(req.user!._id.toString(), req.query as any);
      return sendSuccess(res, 'Lấy lịch sử chấm công thành công', list);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy lịch sử chấm công', error, 400);
    }
  }

  static async getAllAttendances(req: Request, res: Response) {
    try {
      const result = await AttendanceService.getAllAttendances(req.query as any);
      return sendSuccess(res, 'Lấy toàn bộ danh sách chấm công thành công', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách chấm công', error, 400);
    }
  }

  static async adminUpdateAttendance(req: AuthRequest, res: Response) {
    try {
      const updated = await AttendanceService.adminUpdateAttendance(
        req.params.id,
        req.user!._id.toString(),
        req.body
      );
      return sendSuccess(res, 'Cập nhật chấm công và ghi nhận audit log thành công', updated);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật chấm công thất bại', error, 400);
    }
  }

  static async getAuditLogs(req: Request, res: Response) {
    try {
      const logs = await AttendanceService.getAttendanceAuditLogs(req.params.id);
      return sendSuccess(res, 'Lấy lịch sử audit log thành công', logs);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy audit logs', error, 400);
    }
  }

  static async generateQr(req: Request, res: Response) {
    try {
      const { courtId, expiresInMinutes } = req.body;
      const qrInfo = await AttendanceService.generateQrCode(courtId, expiresInMinutes);
      return sendSuccess(res, 'Tạo mã QR chấm công thành công', qrInfo);
    } catch (error: any) {
      return sendError(res, error.message || 'Tạo QR code thất bại', error, 400);
    }
  }
}
