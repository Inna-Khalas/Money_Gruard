import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createTransactionSchema,
  putTransactionSchema,
} from '../validation/transactions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidID } from '../middlewares/isValidId.js';
import {
  getCategories,
  createTransactionController,
  deleteTransaction,
  getCategoryById,
  getSummaryController,
  getTransactionsController,
  putTransactionController,
} from '../controllers/transactions/transactions.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getTransactionsController));

router.get('/categories', ctrlWrapper(getCategories));

router.get('categories/:id', ctrlWrapper(getCategoryById));

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
