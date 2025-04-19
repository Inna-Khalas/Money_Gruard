import { Router } from 'express';
import registerRoute from './register.js';

const router = Router();

router.use(registerRoute);

export default router;
