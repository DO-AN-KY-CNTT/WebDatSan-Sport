import { Request, Response } from 'express';
import { CourtService } from '../services/courtService';
import { sendSuccess, sendError } from '../utils/response';

export class CourtController {
  static async getAllCourts(req: Request, res: Response) {
    try {
      const result = await CourtService.getAllCourts(req.query as any);
      return sendSuccess(res, 'Lấy danh sách sân thành công', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi khi lấy danh sách sân', error, 400);
    }
  }

  static async getCourtById(req: Request, res: Response) {
    try {
      const court = await CourtService.getCourtById(req.params.id);
      return sendSuccess(res, 'Lấy chi tiết sân thành công', court);
    } catch (error: any) {
      return sendError(res, error.message || 'Không tìm thấy sân', error, 404);
    }
  }

  static async createCourt(req: Request, res: Response) {
    try {
      const court = await CourtService.createCourt(req.body);
      return sendSuccess(res, 'Tạo sân thể thao mới thành công', court, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Tạo sân thất bại', error, 400);
    }
  }

  static async updateCourt(req: Request, res: Response) {
    try {
      const court = await CourtService.updateCourt(req.params.id, req.body);
      return sendSuccess(res, 'Cập nhật thông tin sân thành công', court);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật sân thất bại', error, 400);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const court = await CourtService.updateStatus(req.params.id, status);
      return sendSuccess(res, 'Cập nhật trạng thái sân thành công', court);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật trạng thái thất bại', error, 400);
    }
  }

  static async deleteCourt(req: Request, res: Response) {
    try {
      const court = await CourtService.deleteCourt(req.params.id);
      return sendSuccess(res, 'Xóa sân thể thao thành công', court);
    } catch (error: any) {
      return sendError(res, error.message || 'Xóa sân thất bại', error, 400);
    }
  }
}
