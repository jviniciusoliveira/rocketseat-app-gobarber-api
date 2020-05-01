import User from '../models/user';
import File from '../models/file';

import Cache from '../../lib/cache';

class ProviderController {
  async index(request, response) {
    const providersCached = await Cache.get('providers');

    if (providersCached) {
      return response.json(providersCached);
    }

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

    Cache.set('providers', providers);

    return response.json(providers);
  }
}

export default new ProviderController();
