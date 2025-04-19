



import { Router } from 'express';  
import { logout } from '../controllers/logoutController.js';  
import { verifyToken } from '../middlewares/authenticate.js'; 

const router = Router();


router.post('/logout', verifyToken, logout);

export default router;  
