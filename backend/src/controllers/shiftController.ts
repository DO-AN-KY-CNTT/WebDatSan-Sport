import { Request, Response } from 'express';
import { ShiftService } from '../services/shiftService';
import { sendSuccess, sendError } from '../utils/response';

export class ShiftController {
  static async getAllShifts(req: Request, res: Response) {
    try {
      const shifts = await ShiftService.getAllShifts(req.query.status as string);
      return sendSuccess(res, 'Lấy danh sách ca làm thành công', shifts);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy ca làm', error, 400);
    }
  }

  static async getShiftById(req: Request, res: Response) {
    try {
      const shift = await ShiftService.getShiftById(req.params.id);
      return sendSuccess(res, 'Lấy chi tiết ca làm thành công', shift);
    } catch (error: any) {
      return sendError(res, error.message || 'Không tìm thấy ca làm', error, 404);
    }
  }

  static async createShift(req: Request, res: Response) {
    try {
      const shift = await ShiftService.createShift(req.body);
      return sendSuccess(res, 'Tạo ca làm mới thành công', shift, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Tạo ca làm thất bại', error, 400);
    }
  }

  static async updateShift(req: Request, res: Response) {
    try {
      const shift = await ShiftService.updateShift(req.params.id, req.body);
      return sendSuccess(res, 'Cập nhật ca làm thành công', shift);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật ca làm thất bại', error, 400);
    }
  }

  static async deleteShift(req: Request, res: Response) {
    try {
      const shift = await ShiftService.deleteShift(req.params.id);
      return sendSuccess(res, 'Xóa ca làm thành công', shift);
    } catch (error: any) {
      return sendError(res, error.message || 'Xóa ca làm thất bại', error, 400);
    }
  }
}
