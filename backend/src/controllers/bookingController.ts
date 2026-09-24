import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export class BookingController {
  static async createBooking(req: AuthRequest, res: Response) {
    try {
      const booking = await BookingService.createBooking(req.user!._id, req.body);
      return sendSuccess(res, 'Đặt sân thành công', booking, 201);
    } catch (error: any) {
      const status = error.message.includes('đã có khách hàng đặt') ? 409 : 400;
      return sendError(res, error.message || 'Đặt sân thất bại', error, status);
    }
  }

  static async getCourtOccupiedSlots(req: Request, res: Response) {
    try {
      const { courtId } = req.params;
      const { date } = req.query;
      if (!date || typeof date !== 'string') {
        return sendError(res, 'Vui lòng cung cấp ngày (YYYY-MM-DD)', null, 400);
      }
      const slots = await BookingService.getCourtOccupiedSlots(courtId, date);
      return sendSuccess(res, 'Lấy lịch sân thành công', slots);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy lịch sân', error, 400);
    }
  }

  static async getMyBookings(req: AuthRequest, res: Response) {
    try {
      const { status } = req.query;
      const bookings = await BookingService.getMyBookings(req.user!._id, status as string);
      return sendSuccess(res, 'Lấy danh sách booking thành công', bookings);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách booking', error, 400);
    }
  }

  static async getAllBookings(req: Request, res: Response) {
    try {
      const result = await BookingService.getAllBookings(req.query as any);
      return sendSuccess(res, 'Lấy toàn bộ booking thành công', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách booking', error, 400);
    }
  }

  static async getBookingById(req: Request, res: Response) {
    try {
      const booking = await BookingService.getBookingById(req.params.id);
      return sendSuccess(res, 'Lấy chi tiết booking thành công', booking);
    } catch (error: any) {
      return sendError(res, error.message || 'Không tìm thấy booking', error, 404);
    }
  }

  static async cancelBooking(req: AuthRequest, res: Response) {
    try {
      const { cancelReason } = req.body;
      const booking = await BookingService.cancelBooking(
        req.params.id,
        req.user!._id.toString(),
        req.user!.role,
        cancelReason
      );
      return sendSuccess(res, 'Hủy đơn đặt sân thành công', booking);
    } catch (error: any) {
      return sendError(res, error.message || 'Hủy đơn thất bại', error, 400);
    }
  }

  static async updateBookingStatus(req: Request, res: Response) {
    try {
      const { status, paymentStatus } = req.body;
      const booking = await BookingService.updateBookingStatus(req.params.id, status, paymentStatus);
      return sendSuccess(res, 'Cập nhật trạng thái booking thành công', booking);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật thất bại', error, 400);
    }
  }
}
