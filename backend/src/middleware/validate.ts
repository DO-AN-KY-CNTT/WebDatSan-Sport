import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/response';

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('; ');
        return sendError(res, `Dữ liệu không hợp lệ: ${errorMessages}`, error.errors, 422);
      }
      return sendError(res, 'Lỗi kiểm tra dữ liệu đầu vào', error, 400);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('; ');
        return sendError(res, `Tham số truy vấn không hợp lệ: ${errorMessages}`, error.errors, 422);
      }
      return sendError(res, 'Lỗi tham số truy vấn', error, 400);
    }
  };
};
