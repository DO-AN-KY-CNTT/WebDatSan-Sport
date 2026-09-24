import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createReviewSchema } from '../validators/reviewValidator';

const router = Router();

// Public: Xem danh sách review theo sân
router.get('/court/:courtId', ReviewController.getCourtReviews);

// Customer: Gửi review cho booking đã hoàn tất
router.post(
  '/',
  authenticate,
  validateBody(createReviewSchema),
  ReviewController.createReview
);

// Admin / Manager: Quản lý toàn bộ reviews
router.get(
  '/',
  authenticate,
  authorize('admin', 'manager'),
  ReviewController.getAllReviews
);

export default router;
