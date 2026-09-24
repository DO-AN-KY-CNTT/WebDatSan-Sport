import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.registerCustomer(req.body);
      return sendSuccess(res, 'Đăng ký tài khoản thành công', result, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Đăng ký thất bại', error, 400);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return sendSuccess(res, 'Đăng nhập thành công', result);
    } catch (error: any) {
      return sendError(res, error.message || 'Đăng nhập thất bại', error, 401);
    }
  }

  static async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getCurrentUser(req.user!._id);
      return sendSuccess(res, 'Lấy thông tin tài khoản thành công', user);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy thông tin', error, 400);
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const updated = await AuthService.updateProfile(req.user!._id, req.body);
      return sendSuccess(res, 'Cập nhật hồ sơ thành công', updated);
    } catch (error: any) {
      return sendError(res, error.message || 'Cập nhật thất bại', error, 400);
    }
  }

  static async changePassword(req: AuthRequest, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await AuthService.changePassword(req.user!._id, oldPassword, newPassword);
      return sendSuccess(res, result.message);
    } catch (error: any) {
      return sendError(res, error.message || 'Đổi mật khẩu thất bại', error, 400);
    }
  }

  static async logout(_req: Request, res: Response) {
    return sendSuccess(res, 'Đăng xuất thành công');
  }
}
