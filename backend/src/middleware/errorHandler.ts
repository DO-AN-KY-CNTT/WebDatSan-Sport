import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[Error Middleware]:', err);

  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  const message = err.message || 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.';

  return sendError(res, message, err.errors || err.stack, statusCode);
};
