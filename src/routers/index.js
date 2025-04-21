import { Router } from 'express';
import transactionsRouter from '../routers/transactions.js';
import authRouter from '../routers/auth.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/auth', authRouter);
router.use('/api-docs', swaggerDocs());

export default router;
