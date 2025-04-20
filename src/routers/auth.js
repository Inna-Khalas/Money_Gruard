import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerSchema } from '../validation/auth.js';
import { verifyToken } from '../middlewares/authenticateLogout.js';
import { getCurrentUser } from '../controllers/userControllers.js';
import {
  logoutUserController,
  registerUserController,
} from '../controllers/auth/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

router.post('/logout', verifyToken, ctrlWrapper(logoutUserController));

router.get('/user', ctrlWrapper(getCurrentUser));

export default router;
