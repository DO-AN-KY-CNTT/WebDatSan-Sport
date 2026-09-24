import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  court: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Người đánh giá là bắt buộc'],
    },
    court: {
      type: Schema.Types.ObjectId,
      ref: 'Court',
      required: [true, 'Sân thể thao được đánh giá là bắt buộc'],
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Đơn đặt sân là bắt buộc để đánh giá'],
      unique: true, // Mỗi booking chỉ được đánh giá 1 lần
    },
    rating: {
      type: Number,
      required: [true, 'Số sao đánh giá là bắt buộc'],
      min: [1, 'Đánh giá tối thiểu 1 sao'],
      max: [5, 'Đánh giá tối đa 5 sao'],
    },
    comment: {
      type: String,
      required: [true, 'Nội dung nhận xét là bắt buộc'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ court: 1, createdAt: -1 });

export const Review: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);
