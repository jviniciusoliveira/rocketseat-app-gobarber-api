import { Router } from 'express';

import UserController from './app/controllers/user';

const router = new Router();

router.get('/', (request, response) => {
  return response.json({ status: 'success' });
});

router.post('/users', UserController.store);

export default router;
