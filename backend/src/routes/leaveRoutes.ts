import { Router } from 'express';
import { LeaveController } from '../controllers/leaveController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  createLeaveRequestSchema,
  processLeaveRequestSchema,
} from '../validators/leaveValidator';

const router = Router();

router.use(authenticate);

// Nhân viên gửi đơn, xem đơn của mình, hủy đơn
router.post('/', validateBody(createLeaveRequestSchema), LeaveController.createLeaveRequest);
router.get('/my', LeaveController.getMyLeaveRequests);
router.put('/:id/cancel', LeaveController.cancelLeaveRequest);

// Admin / Manager duyệt và quản lý toàn bộ đơn
router.get('/', authorize('admin', 'manager'), LeaveController.getAllLeaveRequests);
router.put(
  '/:id/approve',
  authorize('admin', 'manager'),
  validateBody(processLeaveRequestSchema),
  LeaveController.approveLeaveRequest
);
router.put(
  '/:id/reject',
  authorize('admin', 'manager'),
  validateBody(processLeaveRequestSchema),
  LeaveController.rejectLeaveRequest
);

export default router;
