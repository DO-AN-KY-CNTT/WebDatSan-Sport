import mongoose, { Schema, Document, Model } from 'mongoose';
import { EmployeePosition, EmployeeStatus } from '../types';

export interface IEmployee extends Document {
  user?: mongoose.Types.ObjectId;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  position: EmployeePosition;
  department: string;
  salary: number; // Lương cơ bản tháng
  hireDate: Date;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    employeeCode: {
      type: String,
      required: [true, 'Mã nhân viên là bắt buộc'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    fullName: {
      type: String,
      required: [true, 'Họ và tên nhân viên là bắt buộc'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email nhân viên là bắt buộc'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Số điện thoại nhân viên là bắt buộc'],
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'male',
    },
    address: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      enum: ['manager', 'receptionist', 'field_staff', 'cashier', 'security', 'cleaner', 'other'],
      default: 'field_staff',
    },
    department: {
      type: String,
      default: 'Vận hành sân',
    },
    salary: {
      type: Number,
      required: [true, 'Mức lương cơ bản là bắt buộc'],
      min: [0, 'Lương không được nhỏ hơn 0'],
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on_leave', 'terminated'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export const Employee: Model<IEmployee> = mongoose.model<IEmployee>('Employee', EmployeeSchema);
