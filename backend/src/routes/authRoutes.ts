import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/authValidator';

const router = Router();

router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);
router.get('/me', authenticate, AuthController.getMe);
router.put('/profile', authenticate, validateBody(updateProfileSchema), AuthController.updateProfile);
router.put('/change-password', authenticate, validateBody(changePasswordSchema), AuthController.changePassword);
router.post('/logout', authenticate, AuthController.logout);

export default router;
