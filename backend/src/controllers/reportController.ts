import { Request, Response } from 'express';
import { ReportService } from '../services/reportService';
import { sendSuccess, sendError } from '../utils/response';

export class ReportController {
  static async getDashboardOverview(_req: Request, res: Response) {
    try {
      const data = await ReportService.getDashboardOverview();
      return sendSuccess(res, 'Lấy dữ liệu tổng quan báo cáo thành công', data);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy dữ liệu báo cáo', error, 400);
    }
  }
}
