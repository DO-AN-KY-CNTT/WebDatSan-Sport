import mongoose, { Schema, Document, Model } from 'mongoose';
import { ScheduleStatus } from '../types';

export interface IWorkSchedule extends Document {
  employee: mongoose.Types.ObjectId;
  shift: mongoose.Types.ObjectId;
  court?: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  status: ScheduleStatus;
  note?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WorkScheduleSchema = new Schema<IWorkSchedule>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Nhân viên là bắt buộc'],
    },
    shift: {
      type: Schema.Types.ObjectId,
      ref: 'Shift',
      required: [true, 'Ca làm việc là bắt buộc'],
    },
    court: {
      type: Schema.Types.ObjectId,
      ref: 'Court',
      required: false,
    },
    date: {
      type: String,
      required: [true, 'Ngày phân ca là bắt buộc (YYYY-MM-DD)'],
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    note: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

WorkScheduleSchema.index({ employee: 1, date: 1, shift: 1 }, { unique: true });
WorkScheduleSchema.index({ date: 1 });

export const WorkSchedule: Model<IWorkSchedule> = mongoose.model<IWorkSchedule>(
  'WorkSchedule',
  WorkScheduleSchema
);
