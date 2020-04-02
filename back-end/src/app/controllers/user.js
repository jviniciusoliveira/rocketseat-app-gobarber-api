import User from '../models/user';

class UserController {
  async store(request, response) {
    const { name, email, password, provider = false } = request.body;

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return response.json({ error: 'User already exists.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      provider,
    });

    return response.json(user.id);
  }
}

export default new UserController();
