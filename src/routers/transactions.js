import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createTransactionSchema } from '../validation/transactions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTransactionController } from '../controllers/transactions/postTransaction.js';
// import { authenticate } from '../middlewares/authenticate.js';
import getTransactionsController from '../controllers/transactions/getTransaction.js';

const router = Router();

// router.use(authenticate);

router.post(
  '/',
  validateBody(createTransactionSchema),
  ctrlWrapper(createTransactionController),
);
router.get('/', getTransactionsController);

export default router;
