import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có tối thiểu 6 ký tự'),
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  phone: z.string().regex(/^[0-9+]{9,15}$/, 'Số điện thoại không hợp lệ'),
  avatar: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').optional(),
  phone: z.string().regex(/^[0-9+]{9,15}$/, 'Số điện thoại không hợp lệ').optional(),
  avatar: z.string().url().optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Mật khẩu hiện tại không được để trống'),
  newPassword: z.string().min(6, 'Mật khẩu mới phải có tối thiểu 6 ký tự'),
});
