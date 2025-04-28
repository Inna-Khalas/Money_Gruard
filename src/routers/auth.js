import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerSchema,
  loginUserSchema,
  updateUserSchema,
} from '../validation/auth.js';
import {
  getCurrentUser,
  patchUserController,
} from '../controllers/userControllers.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  // refreshSessionController,
  registerUserController,
} from '../controllers/auth/auth.js';
import { verifyToken } from '../middlewares/authenticateLogout.js';
import { isValidID } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

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

router.post('/refresh', ctrlWrapper(refreshSessionController));

router.get('/current/user', authenticate, ctrlWrapper(getCurrentUser));

router.patch(
  '/user/:id',
  isValidID,
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;
