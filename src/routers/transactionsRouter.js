



import { Router } from 'express';  
import { deleteTransaction } from '../controllers/deleteTransactionController.js'; 

const router = Router();


router.delete('/transactions/:id', deleteTransaction);

export default router; 
