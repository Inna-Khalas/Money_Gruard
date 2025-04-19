import { Router } from 'express';
import { register } from '../controllers/auth/register.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/auth.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);

export default router;
