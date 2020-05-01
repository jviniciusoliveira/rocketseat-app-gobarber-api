import Appointment from '../models/appointment';
import User from '../models/user';
import File from '../models/file';

import CreateAppointmentService from '../services/create-appointment';
import CancelAppointmentService from '../services/cancel-appointment';

import Cache from '../../lib/cache';

class AppointmentController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const cacheKey = `user:${request.userId}:appointments:${page}`;
    const appointmentsCached = await Cache.get(cacheKey);

    if (appointmentsCached) {
      return response.json(appointmentsCached);
    }

    const appointments = await Appointment.findAll({
      where: {
        user_id: request.userId,
        canceled_at: null,
      },
      attributes: ['id', 'date', 'past', 'cancelable'],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    Cache.set(cacheKey, appointments);

    return response.json(appointments);
  }

  async store(request, response) {
    const { provider_id, date } = request.body;

    const appointment = await CreateAppointmentService.run({
      provider_id,
      user_id: request.userId,
      date,
    });

    return response.json(appointment);
  }

  async delete(request, response) {
    const appointment = await CancelAppointmentService.run({
      appointment_id: request.params.id,
      user_id: request.userId,
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();
