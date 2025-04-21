import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerSchema, loginUserSchema } from '../validation/auth.js';
import { getCurrentUser } from '../controllers/userControllers.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth/auth.js';
import { verifyToken } from '../middlewares/authenticateLogout.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', verifyToken, ctrlWrapper(logoutUserController));

router.get('/user', ctrlWrapper(getCurrentUser));

export default router;
