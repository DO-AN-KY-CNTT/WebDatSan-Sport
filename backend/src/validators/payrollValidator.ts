import { z } from 'zod';

export const calculatePayrollSchema = z.object({
  employeeId: z.string().min(1, 'ID nhân viên là bắt buộc'),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020),
  allowance: z.number().min(0).optional().default(0),
  overtimePay: z.number().min(0).optional().default(0),
  deduction: z.number().min(0).optional().default(0),
  notes: z.string().optional().default(''),
});

export const updatePayrollSchema = z.object({
  allowance: z.number().min(0).optional(),
  overtimePay: z.number().min(0).optional(),
  deduction: z.number().min(0).optional(),
  status: z.enum(['draft', 'approved', 'paid']).optional(),
  notes: z.string().optional(),
});
