import { z } from 'zod';

export const createWorkScheduleSchema = z.object({
  employeeId: z.string().min(1, 'ID nhân viên là bắt buộc'),
  shiftId: z.string().min(1, 'ID ca làm việc là bắt buộc'),
  courtId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày phân ca phải có định dạng YYYY-MM-DD'),
  note: z.string().optional().default(''),
});

export const updateWorkScheduleSchema = z.object({
  shiftId: z.string().optional(),
  courtId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
  note: z.string().optional(),
});
