import { Router } from 'express';
import { ShiftController } from '../controllers/shiftController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createShiftSchema, updateShiftSchema } from '../validators/shiftValidator';

const router = Router();

router.use(authenticate);

// Tất cả nhân viên đều có thể xem danh sách ca làm
router.get('/', ShiftController.getAllShifts);
router.get('/:id', ShiftController.getShiftById);

// Admin & Manager được thêm/sửa/xóa ca
router.post(
  '/',
  authorize('admin', 'manager'),
  validateBody(createShiftSchema),
  ShiftController.createShift
);

router.put(
  '/:id',
  authorize('admin', 'manager'),
  validateBody(updateShiftSchema),
  ShiftController.updateShift
);

router.delete(
  '/:id',
  authorize('admin', 'manager'),
  ShiftController.deleteShift
);

export default router;
