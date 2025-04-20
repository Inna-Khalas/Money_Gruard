import { Router } from 'express';
import { deleteTransaction } from '../controllers/transactions/deleteTransactionController';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.delete('/transactions/:id', ctrlWrapper(deleteTransaction));

export default router;
