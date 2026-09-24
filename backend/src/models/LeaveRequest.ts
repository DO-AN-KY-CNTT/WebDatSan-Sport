import mongoose, { Schema, Document, Model } from 'mongoose';
import { LeaveType, LeaveStatus } from '../types';

export interface ILeaveRequest extends Document {
  employee: mongoose.Types.ObjectId;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  type: LeaveType;
  reason: string;
  status: LeaveStatus;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  responseNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Nhân viên xin nghỉ phép là bắt buộc'],
    },
    startDate: {
      type: String,
      required: [true, 'Ngày bắt đầu nghỉ là bắt buộc (YYYY-MM-DD)'],
    },
    endDate: {
      type: String,
      required: [true, 'Ngày kết thúc nghỉ là bắt buộc (YYYY-MM-DD)'],
    },
    type: {
      type: String,
      enum: ['annual_leave', 'sick_leave', 'personal_leave', 'unpaid_leave', 'other'],
      default: 'annual_leave',
    },
    reason: {
      type: String,
      required: [true, 'Lý do xin nghỉ là bắt buộc'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    responseNote: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

LeaveRequestSchema.index({ employee: 1, startDate: 1 });
LeaveRequestSchema.index({ status: 1 });

export const LeaveRequest: Model<ILeaveRequest> = mongoose.model<ILeaveRequest>(
  'LeaveRequest',
  LeaveRequestSchema
);
