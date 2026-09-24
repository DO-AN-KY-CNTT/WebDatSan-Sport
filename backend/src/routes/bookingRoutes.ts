import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  createBookingSchema,
  cancelBookingSchema,
  updateBookingStatusSchema,
} from '../validators/bookingValidator';

const router = Router();

// Public: Xem các khung giờ đã có người đặt trong ngày của 1 sân
router.get('/court/:courtId/slots', BookingController.getCourtOccupiedSlots);

// Customer: Đặt sân & xem booking của mình
router.post(
  '/',
  authenticate,
  validateBody(createBookingSchema),
  BookingController.createBooking
);

router.get('/my', authenticate, BookingController.getMyBookings);

// Admin & Manager: Xem toàn bộ bookings
router.get(
  '/',
  authenticate,
  authorize('admin', 'manager', 'staff'),
  BookingController.getAllBookings
);

router.get('/:id', authenticate, BookingController.getBookingById);

// Hủy booking (Customer hủy của mình, Admin/Manager có thể hủy)
router.put(
  '/:id/cancel',
  authenticate,
  validateBody(cancelBookingSchema),
  BookingController.cancelBooking
);

// Admin & Manager: Cập nhật trạng thái booking
router.patch(
  '/:id/status',
  authenticate,
  authorize('admin', 'manager'),
  validateBody(updateBookingStatusSchema),
  BookingController.updateBookingStatus
);

export default router;
