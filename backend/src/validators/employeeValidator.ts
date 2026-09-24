import { z } from 'zod';

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(2, 'Mã nhân viên tối thiểu 2 ký tự').toUpperCase(),
  fullName: z.string().min(2, 'Họ tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không đúng định dạng'),
  phone: z.string().regex(/^[0-9+]{9,15}$/, 'Số điện thoại không hợp lệ'),
  avatar: z.string().url().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).default('male'),
  address: z.string().optional().default(''),
  position: z.enum(
    ['manager', 'receptionist', 'field_staff', 'cashier', 'security', 'cleaner', 'other'],
    { errorMap: () => ({ message: 'Vị trí không hợp lệ' }) }
  ),
  department: z.string().min(2, 'Bộ phận là bắt buộc'),
  salary: z.number().min(0, 'Mức lương cơ bản không được âm'),
  hireDate: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'terminated']).default('active'),
  // Option to create user login account
  createUserAccount: z.boolean().optional().default(false),
  temporaryPassword: z.string().min(6, 'Mật khẩu tạm tối thiểu 6 ký tự').optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial().omit({
  createUserAccount: true,
  temporaryPassword: true,
});

export const updateEmployeeStatusSchema = z.object({
  status: z.enum(['active', 'inactive', 'on_leave', 'terminated']),
});
