import {
  appointmentSchemaStore,
  sessionSchemaStore,
  userSchemaStore,
  userSchemaUpdate,
} from './validation-schemas';

const routesValidate = {
  '/appointments.POST': appointmentSchemaStore,
  '/sessions.POST': sessionSchemaStore,
  '/users.POST': userSchemaStore,
  '/users.PUT': userSchemaUpdate,
};

export default routesValidate;
