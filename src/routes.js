import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/user';
import SessionController from './app/controllers/session';
import FileController from './app/controllers/file';
import ProviderController from './app/controllers/provider';
import AppointmentController from './app/controllers/appointment';
import ScheduleController from './app/controllers/schedule';
import NotificationController from './app/controllers/notification';
import AvailableController from './app/controllers/available';

import validateUserStore from './app/validators/user-store';
import validateUserUpdate from './app/validators/user-update';
import validateSessionStore from './app/validators/session-store';
import validateAppointmentStore from './app/validators/appointment-store';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', validateUserStore, UserController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
