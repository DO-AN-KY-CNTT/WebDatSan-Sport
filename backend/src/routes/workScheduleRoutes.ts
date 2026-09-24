import { Router } from 'express';
import { WorkScheduleController } from '../controllers/workScheduleController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  createWorkScheduleSchema,
  updateWorkScheduleSchema,
} from '../validators/workScheduleValidator';

const router = Router();

router.use(authenticate);

// Nhân viên xem lịch làm việc của chính mình
router.get('/my', WorkScheduleController.getMySchedules);

// Admin & Manager quản lý toàn bộ phân ca
router.get(
  '/',
  authorize('admin', 'manager'),
  WorkScheduleController.getAllSchedules
);

router.post(
  '/',
  authorize('admin', 'manager'),
  validateBody(createWorkScheduleSchema),
  WorkScheduleController.createSchedule
);

router.put(
  '/:id',
  authorize('admin', 'manager'),
  validateBody(updateWorkScheduleSchema),
  WorkScheduleController.updateSchedule
);

router.delete(
  '/:id',
  authorize('admin', 'manager'),
  WorkScheduleController.deleteSchedule
);

export default router;
