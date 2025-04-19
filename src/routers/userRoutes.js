import express from 'express';
import { getCurrentUser } from '../controllers/userControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', authMiddleware, ctrlWrapper (getCurrentUser));

export default router;