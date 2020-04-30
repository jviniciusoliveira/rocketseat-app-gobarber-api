import * as Yup from 'yup';

const appointmentSchemaStore = () => {
  return Yup.object().shape({
    provider_id: Yup.number().required(),
    date: Yup.date().required(),
  });
};

const sessionSchemaStore = () => {
  return Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
};

const userSchemaStore = () => {
  return Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });
};

const userSchemaUpdate = () => {
  return Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });
};

export {
  appointmentSchemaStore,
  sessionSchemaStore,
  userSchemaStore,
  userSchemaUpdate,
};
