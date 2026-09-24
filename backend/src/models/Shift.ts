import mongoose, { Schema, Document, Model } from 'mongoose';
import { ShiftStatus } from '../types';

export interface IShift extends Document {
  name: string;
  startTime: string; // "08:00"
  endTime: string; // "17:00"
  breakStart?: string; // "12:00"
  breakEnd?: string; // "13:00"
  gracePeriod: number; // số phút cho phép trễ (mặc định 15 phút)
  status: ShiftStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ShiftSchema = new Schema<IShift>(
  {
    name: {
      type: String,
      required: [true, 'Tên ca làm việc là bắt buộc'],
      trim: true,
    },
    startTime: {
      type: String,
      required: [true, 'Giờ bắt đầu ca là bắt buộc (HH:mm)'],
    },
    endTime: {
      type: String,
      required: [true, 'Giờ kết thúc ca là bắt buộc (HH:mm)'],
    },
    breakStart: {
      type: String,
      default: '12:00',
    },
    breakEnd: {
      type: String,
      default: '13:00',
    },
    gracePeriod: {
      type: Number,
      default: 15,
      min: [0, 'Thời gian ân hạn trễ không được âm'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export const Shift: Model<IShift> = mongoose.model<IShift>('Shift', ShiftSchema);
