import { Router } from 'express';

import UserController from './app/controllers/user';
import SessionController from './app/controllers/session';

const router = new Router();

router.post('/users', UserController.store);

router.post('/sessions', SessionController.store);

export default router;
