import { Request, Response } from 'express';
import { WorkScheduleService } from '../services/workScheduleService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export class WorkScheduleController {
  static async getAllSchedules(req: Request, res: Response) {
    try {
      const schedules = await WorkScheduleService.getAllSchedules(req.query as any);
      return sendSuccess(res, 'Lấy danh sách phân ca thành công', schedules);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách phân ca', error, 400);
    }
  }

  static async getMySchedules(req: AuthRequest, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const schedules = await WorkScheduleService.getMySchedules(
        req.user!._id.toString(),
        startDate as string,
        endDate as string
      );
      return sendSuccess(res, 'Lấy lịch làm việc cá nhân thành công', schedules);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy lịch làm việc', error, 400);
    }
  }

  static async createSchedule(req: AuthRequest, res: Response) {
    try {
      const schedule = await WorkScheduleService.createSchedule({
        ...req.body,
        createdBy: req.user!._id.toString(),
      });
      return sendSuccess(res, 'Phân ca làm việc thành công', schedule, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Phân ca thất bại', error, 400);
    }
  }

  static async updateSchedule(req: Request, res: Response) {
    try {
      const schedule = await WorkScheduleService.updateSchedule(req.params.id, req.body);
      return sendSuccess(res, 'Cập nhật phân ca thành công', schedule);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật phân ca thất bại', error, 400);
    }
  }

  static async deleteSchedule(req: Request, res: Response) {
    try {
      const schedule = await WorkScheduleService.deleteSchedule(req.params.id);
      return sendSuccess(res, 'Xóa phân ca thành công', schedule);
    } catch (error: any) {
      return sendError(res, error.message || 'Xóa phân ca thất bại', error, 400);
    }
  }
}
