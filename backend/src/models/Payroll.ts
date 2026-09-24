import mongoose, { Schema, Document, Model } from 'mongoose';
import { PayrollStatus } from '../types';

export interface IPayroll extends Document {
  employee: mongoose.Types.ObjectId;
  month: number; // 1 - 12
  year: number; // 2026
  baseSalary: number;
  totalWorkDays: number;
  totalWorkHours: number;
  allowance: number;
  overtimePay: number;
  deduction: number;
  totalSalary: number;
  status: PayrollStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PayrollSchema = new Schema<IPayroll>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Nhân viên là bắt buộc'],
    },
    month: {
      type: Number,
      required: [true, 'Tháng tính lương là bắt buộc'],
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: [true, 'Năm tính lương là bắt buộc'],
    },
    baseSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    totalWorkDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalWorkHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    allowance: {
      type: Number,
      default: 0,
      min: 0,
    },
    overtimePay: {
      type: Number,
      default: 0,
      min: 0,
    },
    deduction: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'approved', 'paid'],
      default: 'draft',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

PayrollSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

export const Payroll: Model<IPayroll> = mongoose.model<IPayroll>('Payroll', PayrollSchema);
