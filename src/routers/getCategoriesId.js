import { Router } from 'express';
import getCategorieId from '../controllers/transactions/getCategoriesId.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const router = Router();

router.get('/:categorieId', ctrlWrapper(getCategorieId));

export default router;
