import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/user';
import Appointment from '../models/appointment';

class ScheduleController {
  async index(request, response) {
    const checkIsProvider = await User.findOne({
      where: {
        id: request.userId,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return response.status(401).json({ error: 'User is not a provider.' });
    }

    let { date = new Date() } = request.query;

    if (!(date instanceof Date)) {
      date = parseISO(date);
    }

    const appointments = await Appointment.findAll({
      where: {
        provider_id: request.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return response.json(appointments);
  }
}

export default new ScheduleController();
