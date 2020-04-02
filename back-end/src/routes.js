import { Router } from 'express';

const router = new Router();

router.get('/', (request, response) => {
  return response.json({ status: 'success' });
});

export default router;
