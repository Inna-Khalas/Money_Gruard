import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createTransactionSchema, putTransactionSchema } from '../validation/transactions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTransactionController } from '../controllers/transactions/postTransaction.js';
import getTransactionsController from '../controllers/transactions/getTransaction.js';

import { putTransactionController } from '../controllers/transactions/putTransactions.js';
// import { authenticate } from '../middlewares/authenticate.js';
import { isValidID } from '../middlewares/isValidId.js';

const router = Router();

// router.use(authenticate);

router.post(
  '/',
  validateBody(createTransactionSchema),
  ctrlWrapper(createTransactionController),
);
router.get('/', getTransactionsController);

router.put(
  '/:id',
  isValidID,
  validateBody(putTransactionSchema),
  ctrlWrapper(putTransactionController)
);

export default router;
