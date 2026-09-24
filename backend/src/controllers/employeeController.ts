import { Request, Response } from 'express';
import { EmployeeService } from '../services/employeeService';
import { sendSuccess, sendError } from '../utils/response';

export class EmployeeController {
  static async getAllEmployees(req: Request, res: Response) {
    try {
      const result = await EmployeeService.getAllEmployees(req.query as any);
      return sendSuccess(res, 'Lấy danh sách nhân viên thành công', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách nhân viên', error, 400);
    }
  }

  static async getEmployeeById(req: Request, res: Response) {
    try {
      const employee = await EmployeeService.getEmployeeById(req.params.id);
      return sendSuccess(res, 'Lấy chi tiết nhân viên thành công', employee);
    } catch (error: any) {
      return sendError(res, error.message || 'Không tìm thấy nhân viên', error, 404);
    }
  }

  static async createEmployee(req: Request, res: Response) {
    try {
      const employee = await EmployeeService.createEmployee(req.body);
      return sendSuccess(res, 'Thêm nhân viên mới thành công', employee, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Thêm nhân viên thất bại', error, 400);
    }
  }

  static async updateEmployee(req: Request, res: Response) {
    try {
      const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
      return sendSuccess(res, 'Cập nhật thông tin nhân viên thành công', employee);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật nhân viên thất bại', error, 400);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const employee = await EmployeeService.updateStatus(req.params.id, status);
      return sendSuccess(res, 'Cập nhật trạng thái nhân viên thành công', employee);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật trạng thái thất bại', error, 400);
    }
  }

  static async deleteEmployee(req: Request, res: Response) {
    try {
      const employee = await EmployeeService.deleteEmployee(req.params.id);
      return sendSuccess(res, 'Xóa nhân viên thành công', employee);
    } catch (error: any) {
      return sendError(res, error.message || 'Xóa nhân viên thất bại', error, 400);
    }
  }
}
