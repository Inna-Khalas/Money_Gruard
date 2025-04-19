import express from 'express';
import { getCurrentUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/user', authMiddleware, ctrlWrapper(getCurrentUser));

export default router;