import { z } from 'zod';

export const createShiftSchema = z.object({
  name: z.string().min(2, 'Tên ca làm tối thiểu 2 ký tự'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ bắt đầu phải là HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ kết thúc phải là HH:mm'),
  breakStart: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ bắt đầu nghỉ phải là HH:mm').optional().default('12:00'),
  breakEnd: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ kết thúc nghỉ phải là HH:mm').optional().default('13:00'),
  gracePeriod: z.number().int().min(0, 'Thời gian cho phép trễ không được âm').default(15),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const updateShiftSchema = createShiftSchema.partial();
