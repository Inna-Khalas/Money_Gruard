import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createTransactionSchema } from '../validation/transactions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTransactionController } from '../controllers/transactions/postTransaction.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(createTransactionSchema),
  ctrlWrapper(createTransactionController),
);

export default router;
