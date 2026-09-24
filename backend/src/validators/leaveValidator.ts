import { z } from 'zod';

export const createLeaveRequestSchema = z
  .object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày bắt đầu phải là YYYY-MM-DD'),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày kết thúc phải là YYYY-MM-DD'),
    type: z.enum(['annual_leave', 'sick_leave', 'personal_leave', 'unpaid_leave', 'other']),
    reason: z.string().min(5, 'Lý do xin nghỉ phép phải có ít nhất 5 ký tự'),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: 'Ngày bắt đầu nghỉ phải trước hoặc bằng ngày kết thúc nghỉ',
    path: ['endDate'],
  });

export const processLeaveRequestSchema = z.object({
  responseNote: z.string().optional().default(''),
});
