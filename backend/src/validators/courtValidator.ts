import { z } from 'zod';

export const createCourtSchema = z.object({
  name: z.string().min(3, 'Tên sân phải có ít nhất 3 ký tự'),
  type: z.enum(['football', 'badminton', 'tennis', 'basketball', 'pickleball', 'volleyball'], {
    errorMap: () => ({ message: 'Loại sân không hợp lệ' }),
  }),
  description: z.string().optional().default(''),
  address: z.string().min(5, 'Địa chỉ sân phải có ít nhất 5 ký tự'),
  location: z.object({
    city: z.string().default('TP. Hồ Chí Minh'),
    district: z.string().default('Quận 1'),
  }).optional(),
  images: z.array(z.string().url()).optional().default([]),
  pricePerHour: z.number().min(0, 'Giá thuê không được âm'),
  amenities: z.array(z.string()).optional().default([]),
  openingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ mở cửa phải theo định dạng HH:mm').default('06:00'),
  closingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ đóng cửa phải theo định dạng HH:mm').default('23:00'),
  status: z.enum(['active', 'inactive', 'maintenance']).optional().default('active'),
});

export const updateCourtSchema = createCourtSchema.partial();

export const updateCourtStatusSchema = z.object({
  status: z.enum(['active', 'inactive', 'maintenance'], {
    errorMap: () => ({ message: 'Trạng thái sân không hợp lệ' }),
  }),
});
