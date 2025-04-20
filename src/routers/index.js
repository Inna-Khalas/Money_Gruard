import { Router } from 'express';
import transactionsRouter from '../routers/transactions.js';
import authRouter from '../routers/auth.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/auth', authRouter);

export default router;
