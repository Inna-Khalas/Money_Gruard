import { Router } from 'express';  
import { deleteTransaction } from '../controllers/transactions/deleteTransactionController.js';  
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.delete('/transactions/:id', ctrlWrapper(deleteTransaction));

export default router;
