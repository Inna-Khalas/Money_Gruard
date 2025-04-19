



import { Router } from 'express';  
import { logout } from '../controllers/transactions/logoutController.js';  
import { verifyToken } from '../middlewares/authenticateLogout.js';  //  middleware для перевірки токену LogOut

const router = Router();


router.post('/logout', verifyToken, logout);

export default router;  
