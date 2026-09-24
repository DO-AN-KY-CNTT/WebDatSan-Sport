import mongoose, { Schema, Document, Model } from 'mongoose';
import { BookingStatus, PaymentStatus, PaymentMethod } from '../types';

export interface IBooking extends Document {
  bookingCode: string;
  user: mongoose.Types.ObjectId;
  court: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "08:00"
  endTime: string; // "10:00"
  totalHours: number;
  pricePerHour: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Khách hàng đặt sân là bắt buộc'],
    },
    court: {
      type: Schema.Types.ObjectId,
      ref: 'Court',
      required: [true, 'Sân thể thao là bắt buộc'],
    },
    date: {
      type: String,
      required: [true, 'Ngày đặt sân là bắt buộc (YYYY-MM-DD)'],
    },
    startTime: {
      type: String,
      required: [true, 'Giờ bắt đầu là bắt buộc (HH:mm)'],
    },
    endTime: {
      type: String,
      required: [true, 'Giờ kết thúc là bắt buộc (HH:mm)'],
    },
    totalHours: {
      type: Number,
      required: true,
      min: [0.5, 'Thời gian đặt sân tối thiểu là 30 phút'],
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'paid',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'banking', 'vnpay_simulated'],
      default: 'banking',
    },
    notes: {
      type: String,
      default: '',
    },
    cancelReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ court: 1, date: 1, status: 1 });
BookingSchema.index({ user: 1, createdAt: -1 });

export const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);
