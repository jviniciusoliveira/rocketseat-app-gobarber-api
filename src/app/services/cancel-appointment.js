import { subHours, isBefore } from 'date-fns';

import Appointment from '../models/appointment';
import User from '../models/user';

import Queue from '../../lib/queue';
import Cache from '../../lib/cache';

class CancelAppointmentService {
  async run({ appointment_id, user_id }) {
    const appointment = await Appointment.findByPk(appointment_id, {
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

    if (appointment.user_id !== user_id) {
      throw new Error("You don't have permission to cancel this appointment.");
    }

    if (appointment.canceled_at !== null) {
      throw new Error('This appointment is already canceled.');
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance.');
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add('cancellation-mail', {
      appointment,
    });

    Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
