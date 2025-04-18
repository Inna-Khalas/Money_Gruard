import { Router } from 'express';


import { logout } from '../controllers/auth';
import { verifyToken } from '../middlewares/authenticate';

const router = Router();

router.post('/logout', verifyToken, logout);



export default router;
