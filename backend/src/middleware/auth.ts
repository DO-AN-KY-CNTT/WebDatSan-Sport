import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { User, IUser } from '../models/User';
import { sendError } from '../utils/response';
import { UserRole } from '../types';

export interface AuthRequest extends Request {
  user?: IUser & { _id: any };
  tokenPayload?: TokenPayload;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Vui lòng đăng nhập để thực hiện thao tác này', null, 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return sendError(res, 'Token xác thực không tồn tại', null, 401);
    }

    const payload = verifyToken(token);
    const user = await User.findById(payload.userId);

    if (!user) {
      return sendError(res, 'Tài khoản không tồn tại hoặc đã bị xóa', null, 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Tài khoản đã bị tạm khóa. Vui lòng liên hệ ban quản trị.', null, 403);
    }

    req.user = user as any;
    req.tokenPayload = payload;
    next();
  } catch (error: any) {
    return sendError(res, 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn', error.message, 401);
  }
};

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (!req.user) {
      return sendError(res, 'Chưa xác thực người dùng', null, 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        'Bạn không có quyền thực hiện chức năng này',
        { userRole: req.user.role, requiredRoles: allowedRoles },
        403
      );
    }

    next();
  };
};
