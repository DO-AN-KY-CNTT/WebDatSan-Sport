import { Request, Response } from 'express';
import { PayrollService } from '../services/payrollService';
import { sendSuccess, sendError } from '../utils/response';

export class PayrollController {
  static async calculatePayroll(req: Request, res: Response) {
    try {
      const payroll = await PayrollService.calculateEmployeePayroll(req.body);
      return sendSuccess(res, 'Tính toán bảng lương thành công', payroll, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Tính bảng lương thất bại', error, 400);
    }
  }

  static async getAllPayrolls(req: Request, res: Response) {
    try {
      const payrolls = await PayrollService.getAllPayrolls(req.query as any);
      return sendSuccess(res, 'Lấy danh sách bảng lương thành công', payrolls);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy bảng lương', error, 400);
    }
  }

  static async getPayrollById(req: Request, res: Response) {
    try {
      const payroll = await PayrollService.getPayrollById(req.params.id);
      return sendSuccess(res, 'Lấy chi tiết bảng lương thành công', payroll);
    } catch (error: any) {
      return sendError(res, error.message || 'Không tìm thấy bảng lương', error, 404);
    }
  }

  static async updatePayroll(req: Request, res: Response) {
    try {
      const payroll = await PayrollService.updatePayroll(req.params.id, req.body);
      return sendSuccess(res, 'Cập nhật bảng lương thành công', payroll);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật bảng lương thất bại', error, 400);
    }
  }
}
