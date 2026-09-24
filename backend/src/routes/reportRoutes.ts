import { Router } from 'express';
import { ReportController } from '../controllers/reportController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(authorize('admin', 'manager'));

router.get('/dashboard', ReportController.getDashboardOverview);

export default router;
