import validationRoutes from './validation-routes';

export default async (request, response, next) => {
  try {
    const { url, method } = request;
    const validate = validationRoutes[`${url}.${method}`];

    if (validate) {
      const schema = validate();
      await schema.validate(request.body, { abortEarly: false });
    }
    return next();
  } catch (error) {
    return response
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
