import { Response } from 'express';

export const sendSuccess = <T>(
  res: Response,
  message: string = 'Thao tác thành công',
  data: T = {} as T,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string = 'Không thể thực hiện thao tác',
  error: any = null,
  statusCode: number = 400
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error || null,
  });
};
