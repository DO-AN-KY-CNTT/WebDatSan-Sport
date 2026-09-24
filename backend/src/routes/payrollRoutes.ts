import { Router } from 'express';
import { PayrollController } from '../controllers/payrollController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  calculatePayrollSchema,
  updatePayrollSchema,
} from '../validators/payrollValidator';

const router = Router();

router.use(authenticate);
router.use(authorize('admin', 'manager'));

router.get('/', PayrollController.getAllPayrolls);
router.get('/:id', PayrollController.getPayrollById);
router.post('/', validateBody(calculatePayrollSchema), PayrollController.calculatePayroll);
router.put('/:id', validateBody(updatePayrollSchema), PayrollController.updatePayroll);

export default router;
