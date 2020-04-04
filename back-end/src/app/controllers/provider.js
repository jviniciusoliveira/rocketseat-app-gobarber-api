import User from '../models/user';
import File from '../models/file';

class ProviderController {
  async index(request, response) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return response.json(providers);
  }
}

export default new ProviderController();
