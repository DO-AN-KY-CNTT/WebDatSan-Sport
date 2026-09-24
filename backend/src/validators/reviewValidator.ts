import { z } from 'zod';

export const createReviewSchema = z.object({
  bookingId: z.string().min(1, 'Mã booking là bắt buộc'),
  rating: z.number().int().min(1, 'Đánh giá tối thiểu 1 sao').max(5, 'Đánh giá tối đa 5 sao'),
  comment: z.string().min(3, 'Nội dung nhận xét tối thiểu 3 ký tự'),
});
