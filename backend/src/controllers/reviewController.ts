import { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export class ReviewController {
  static async createReview(req: AuthRequest, res: Response) {
    try {
      const review = await ReviewService.createReview(req.user!._id.toString(), req.body);
      return sendSuccess(res, 'Gửi đánh giá thành công', review, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Gửi đánh giá thất bại', error, 400);
    }
  }

  static async getCourtReviews(req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getCourtReviews(req.params.courtId);
      return sendSuccess(res, 'Lấy danh sách đánh giá thành công', reviews);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy đánh giá', error, 400);
    }
  }

  static async getAllReviews(_req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getAllReviews();
      return sendSuccess(res, 'Lấy toàn bộ đánh giá thành công', reviews);
    } catch (error: any) {
      return sendError(res, error.message || 'Lỗi lấy danh sách đánh giá', error, 400);
    }
  }
}
