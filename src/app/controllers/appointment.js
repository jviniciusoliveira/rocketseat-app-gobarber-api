import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/appointment';
import User from '../models/user';
import File from '../models/file';
import Notification from '../schemas/notification';

import Queue from '../../lib/queue';

class AppointmentController {
  async index(request, response) {
    const { page = 1 } = request.query;

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

    return response.json(appointments);
  }

  async store(request, response) {
    const { provider_id, date } = request.body;

    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return response
        .status(401)
        .json({ error: 'You can only create appointments with providers.' });
    }

    if (provider_id === request.userId) {
      return response
        .status(401)
        .json({ error: 'You cannot schedule with yourself.' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response
        .status(400)
        .json({ error: 'Past dates are not permitted.' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return response
        .status(400)
        .json({ error: 'Appointment date is not available.' });
    }

    const appointment = await Appointment.create({
      user_id: request.userId,
      provider_id,
      date: hourStart,
    });

    const user = await User.findByPk(request.userId);
    const dateFomatted = format(hourStart, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia ${dateFomatted}.`,
      user: provider_id,
    });

    return response.json(appointment);
  }

  async delete(request, response) {
    const appointment = await Appointment.findByPk(request.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== request.userId) {
      return response.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    if (appointment.canceled_at !== null) {
      return response.status(401).json({
        error: 'This appointment is already canceled.',
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return response.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add('cancellation-mail', {
      appointment,
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();
