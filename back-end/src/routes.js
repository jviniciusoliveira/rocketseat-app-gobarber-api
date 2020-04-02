import { Router } from 'express';

import UserController from './app/controllers/user';
import SessionController from './app/controllers/session';

import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.post('/users', UserController.store);
router.put('/users', authMiddleware, UserController.update);

router.post('/sessions', SessionController.store);

export default router;
