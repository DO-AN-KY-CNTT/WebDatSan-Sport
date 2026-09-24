import { Router } from 'express';
import { EmployeeController } from '../controllers/employeeController';
import { authenticate, authorize } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateEmployeeStatusSchema,
} from '../validators/employeeValidator';

const router = Router();

router.use(authenticate);
router.use(authorize('admin', 'manager'));

router.get('/', EmployeeController.getAllEmployees);
router.get('/:id', EmployeeController.getEmployeeById);

router.post('/', validateBody(createEmployeeSchema), EmployeeController.createEmployee);
router.put('/:id', validateBody(updateEmployeeSchema), EmployeeController.updateEmployee);
router.patch('/:id/status', validateBody(updateEmployeeStatusSchema), EmployeeController.updateStatus);
router.delete('/:id', authorize('admin'), EmployeeController.deleteEmployee);

export default router;
