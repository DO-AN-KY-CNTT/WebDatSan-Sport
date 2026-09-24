import mongoose, { Schema, Document, Model } from 'mongoose';
import { AttendanceAuditAction } from '../types';

export interface IAttendanceLog extends Document {
  attendance: mongoose.Types.ObjectId;
  action: AttendanceAuditAction;
  oldValue?: any;
  newValue?: any;
  performedBy: mongoose.Types.ObjectId;
  reason: string;
  createdAt: Date;
}

const AttendanceLogSchema = new Schema<IAttendanceLog>(
  {
    attendance: {
      type: Schema.Types.ObjectId,
      ref: 'Attendance',
      required: [true, 'Bản ghi chấm công là bắt buộc'],
    },
    action: {
      type: String,
      enum: ['check_in', 'check_out', 'manual_update', 'admin_override'],
      required: true,
    },
    oldValue: {
      type: Schema.Types.Mixed,
    },
    newValue: {
      type: Schema.Types.Mixed,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: [true, 'Lý do thực hiện chỉnh sửa là bắt buộc để kiểm toán'],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AttendanceLogSchema.index({ attendance: 1, createdAt: -1 });

export const AttendanceLog: Model<IAttendanceLog> = mongoose.model<IAttendanceLog>(
  'AttendanceLog',
  AttendanceLogSchema
);
