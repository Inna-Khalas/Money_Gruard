import { Router } from 'express';  
import { deleteTransaction } from '../controllers/transactions/deleteTransactionController.js';  // поправил импорт (Андрей)

const router = Router();


router.delete('/transactions/:id', deleteTransaction);

export default router;  
