import mongoose, { Schema, Document, Model } from 'mongoose';
import { CourtType, CourtStatus } from '../types';

export interface ICourt extends Document {
  name: string;
  type: CourtType;
  description: string;
  address: string;
  location: {
    city: string;
    district: string;
  };
  images: string[];
  pricePerHour: number;
  amenities: string[];
  openingTime: string; // "06:00"
  closingTime: string; // "23:00"
  status: CourtStatus;
  ratingAvg: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourtSchema = new Schema<ICourt>(
  {
    name: {
      type: String,
      required: [true, 'Tên sân là bắt buộc'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['football', 'badminton', 'tennis', 'basketball', 'pickleball', 'volleyball'],
      required: [true, 'Loại sân là bắt buộc'],
    },
    description: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: [true, 'Địa chỉ sân là bắt buộc'],
    },
    location: {
      city: { type: String, default: 'TP. Hồ Chí Minh' },
      district: { type: String, default: 'Quận 1' },
    },
    images: {
      type: [String],
      default: [],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Giá thuê theo giờ là bắt buộc'],
      min: [0, 'Giá thuê không hợp lệ'],
    },
    amenities: {
      type: [String],
      default: ['wifi', 'parking', 'shower', 'lighting'],
    },
    openingTime: {
      type: String,
      default: '06:00',
    },
    closingTime: {
      type: String,
      default: '23:00',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active',
    },
    ratingAvg: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CourtSchema.index({ type: 1, status: 1 });
CourtSchema.index({ 'location.district': 1, 'location.city': 1 });

export const Court: Model<ICourt> = mongoose.model<ICourt>('Court', CourtSchema);
