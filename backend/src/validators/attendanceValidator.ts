import { z } from 'zod';

export const checkInSchema = z.object({
  workScheduleId: z.string().min(1, 'ID lịch làm việc là bắt buộc'),
  note: z.string().optional().default(''),
  qrToken: z.string().optional(),
});

export const checkOutSchema = z.object({
  attendanceId: z.string().min(1, 'ID chấm công là bắt buộc'),
  note: z.string().optional().default(''),
});

export const adminUpdateAttendanceSchema = z.object({
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  status: z.enum(['present', 'late', 'absent', 'leave', 'half_day', 'holiday']).optional(),
  reason: z.string().min(3, 'Lý do chỉnh sửa chấm công là bắt buộc để ghi nhận audit log'),
});

export const generateQrSchema = z.object({
  courtId: z.string().min(1, 'ID sân là bắt buộc'),
  expiresInMinutes: z.number().int().min(1).max(1440).default(60),
});
