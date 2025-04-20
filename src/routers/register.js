import { Router } from 'express';
import { register } from '../controllers/auth/register.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/register', validateBody(registerSchema), ctrlWrapper(register));

export default router;
