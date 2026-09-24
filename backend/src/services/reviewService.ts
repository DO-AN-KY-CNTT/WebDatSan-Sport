import { Review } from '../models/Review';
import { Booking } from '../models/Booking';
import { Court } from '../models/Court';

export class ReviewService {
  static async createReview(
    userId: string,
    data: { bookingId: string; rating: number; comment: string }
  ) {
    const booking = await Booking.findById(data.bookingId);
    if (!booking) {
      throw new Error('Không tìm thấy đơn đặt sân');
    }

    if (booking.user.toString() !== userId) {
      throw new Error('Bạn chỉ có thể đánh giá đơn đặt sân của chính mình');
    }

    if (booking.status !== 'completed') {
      throw new Error('Chỉ có thể đánh giá sân sau khi buổi đặt sân đã hoàn thành (completed)');
    }

    const existingReview = await Review.findOne({ booking: data.bookingId });
    if (existingReview) {
      throw new Error('Bạn đã gửi đánh giá cho đơn đặt sân này rồi');
    }

    const review = await Review.create({
      user: userId,
      court: booking.court,
      booking: data.bookingId,
      rating: data.rating,
      comment: data.comment,
    });

    // Cập nhật rating trung bình và tổng review cho sân
    const stats = await Review.aggregate([
      { $match: { court: booking.court } },
      {
        $group: {
          _id: '$court',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await Court.findByIdAndUpdate(booking.court, {
        ratingAvg: Math.round(stats[0].avgRating * 10) / 10,
        totalReviews: stats[0].count,
      });
    }

    return await Review.findById(review._id).populate('user', 'fullName avatar');
  }

  static async getCourtReviews(courtId: string) {
    return await Review.find({ court: courtId })
      .populate('user', 'fullName avatar')
      .sort({ createdAt: -1 });
  }

  static async getAllReviews() {
    return await Review.find()
      .populate('user', 'fullName email avatar')
      .populate('court', 'name type')
      .sort({ createdAt: -1 });
  }
}
