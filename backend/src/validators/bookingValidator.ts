import { z } from 'zod';

export const createBookingSchema = z
  .object({
    courtId: z.string().min(1, 'ID sân là bắt buộc'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày đặt sân phải có định dạng YYYY-MM-DD'),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ bắt đầu phải có định dạng HH:mm'),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Giờ kết thúc phải có định dạng HH:mm'),
    paymentMethod: z.enum(['cash', 'banking', 'vnpay_simulated']).default('banking'),
    notes: z.string().optional().default(''),
  })
  .refine(
    (data) => {
      const [startHour, startMin] = data.startTime.split(':').map(Number);
      const [endHour, endMin] = data.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      return endMinutes - startMinutes >= 30;
    },
    {
      message: 'Thời gian kết thúc phải sau thời gian bắt đầu tối thiểu 30 phút',
      path: ['endTime'],
    }
  );

export const cancelBookingSchema = z.object({
  cancelReason: z.string().min(3, 'Vui lòng cung cấp lý do hủy sân'),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  paymentStatus: z.enum(['unpaid', 'paid', 'refunded']).optional(),
});
