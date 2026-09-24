import { Router } from 'express';
import { CourtController } from '../controllers/courtController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  createCourtSchema,
  updateCourtSchema,
  updateCourtStatusSchema,
} from '../validators/courtValidator';

const router = Router();

// Public routes
router.get('/', CourtController.getAllCourts);
router.get('/:id', CourtController.getCourtById);

// Admin & Manager routes
router.post(
  '/',
  authenticate,
  authorize('admin', 'manager'),
  validateBody(createCourtSchema),
  CourtController.createCourt
);

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'manager'),
  validateBody(updateCourtSchema),
  CourtController.updateCourt
);

router.patch(
  '/:id/status',
  authenticate,
  authorize('admin', 'manager'),
  validateBody(updateCourtStatusSchema),
  CourtController.updateStatus
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  CourtController.deleteCourt
);

export default router;
