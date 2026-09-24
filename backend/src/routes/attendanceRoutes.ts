import { Router } from 'express';
import { AttendanceController } from '../controllers/attendanceController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  checkInSchema,
  checkOutSchema,
  adminUpdateAttendanceSchema,
  generateQrSchema,
} from '../validators/attendanceValidator';

const router = Router();

router.use(authenticate);

// Nhân viên tự chấm công
router.post('/check-in', validateBody(checkInSchema), AttendanceController.checkIn);
router.post('/check-out', validateBody(checkOutSchema), AttendanceController.checkOut);
router.get('/my', AttendanceController.getMyAttendances);

// Admin & Manager quản trị chấm công
router.get('/', authorize('admin', 'manager'), AttendanceController.getAllAttendances);
router.put(
  '/:id',
  authorize('admin', 'manager'),
  validateBody(adminUpdateAttendanceSchema),
  AttendanceController.adminUpdateAttendance
);
router.get('/:id/logs', authorize('admin', 'manager'), AttendanceController.getAuditLogs);

// Tạo QR Code cho sân
router.post(
  '/generate-qr',
  authorize('admin', 'manager'),
  validateBody(generateQrSchema),
  AttendanceController.generateQr
);

export default router;
