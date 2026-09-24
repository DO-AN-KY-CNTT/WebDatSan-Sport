import mongoose, { Schema, Document, Model } from 'mongoose';
import { AttendanceStatus } from '../types';

export interface IAttendance extends Document {
  employee: mongoose.Types.ObjectId;
  workSchedule: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  checkIn?: Date;
  checkOut?: Date;
  workHours: number; // Tổng số giờ làm việc thực tế
  status: AttendanceStatus;
  note?: string;
  qrVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Nhân viên là bắt buộc'],
    },
    workSchedule: {
      type: Schema.Types.ObjectId,
      ref: 'WorkSchedule',
      required: [true, 'Lịch phân ca là bắt buộc'],
    },
    date: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    workHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['present', 'late', 'absent', 'leave', 'half_day', 'holiday'],
      default: 'present',
    },
    note: {
      type: String,
      default: '',
    },
    qrVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

AttendanceSchema.index({ employee: 1, workSchedule: 1 }, { unique: true });
AttendanceSchema.index({ date: 1, status: 1 });

export const Attendance: Model<IAttendance> = mongoose.model<IAttendance>(
  'Attendance',
  AttendanceSchema
);
