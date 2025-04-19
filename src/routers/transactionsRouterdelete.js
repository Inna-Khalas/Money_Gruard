


import { Router } from 'express';  
import { deleteTransaction } from '../controllers/transactions/deleteTransactionController';  

const router = Router();


router.delete('/transactions/:id', deleteTransaction);

export default router;  
