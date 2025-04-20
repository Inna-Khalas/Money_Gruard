import { Router } from 'express';
import { logout } from '../controllers/transactions/logoutController.js';
import { verifyToken } from '../middlewares/authenticateLogout.js'; //  middleware для перевірки токену LogOut
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/logout', verifyToken, ctrlWrapper(logout));

export default router;
