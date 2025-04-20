import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createTransactionSchema,
  putTransactionSchema,
} from '../validation/transactions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import getTransactionsController from '../controllers/transactions/getTransaction.js';

import { putTransactionController } from '../controllers/transactions/putTransactions.js';
// import { authenticate } from '../middlewares/authenticate.js';
import { isValidID } from '../middlewares/isValidId.js';
import { getSummaryController } from '../controllers/transactions/getSummary.js';
import getCategories, {
  createTransactionController,
  deleteTransaction,
} from '../controllers/transactions/transactions.js';

const router = Router();

// router.use(authenticate);

router.get('/', ctrlWrapper(getTransactionsController));

router.get('/', ctrlWrapper(getCategories));

router.post(
  '/',
  validateBody(createTransactionSchema),
  ctrlWrapper(createTransactionController),
);

router.put(
  '/:id',
  isValidID,
  validateBody(putTransactionSchema),
  ctrlWrapper(putTransactionController),
);

router.delete('/:id', isValidID, ctrlWrapper(deleteTransaction));

router.get('/summary', ctrlWrapper(getSummaryController));

export default router;
