import { Router } from 'express';
import transactionsRouter from '../routers/transactions.js';
import authRouter from '../routers/auth.js';
import userRoutes from '../routers/userRoutes.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/auth', authRouter);
router.use('/user', userRoutes);

export default router;
