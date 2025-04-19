import { Router } from 'express';
import { getCategories } from '../controllers/transactions/getCategories.js';

const router = Router();

router.get('/', getCategories);

export default router;