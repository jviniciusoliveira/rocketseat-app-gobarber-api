import User from '../models/user';
import Notification from '../schemas/notification';

class NotificationController {
  async index(request, response) {
    const checkIsProvider = await User.findOne({
      where: { id: request.userId, provider: true },
    });

    if (!checkIsProvider) {
      return response
        .status(401)
        .json({ error: 'Only provider can load notifications.' });
    }

    const notifications = await Notification.find({
      user: request.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return response.json(notifications);
  }

  async update(request, response) {
    const { id } = request.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return response.status(401).json({
        error: 'Notification not found.',
      });
    }

    if (request.userId !== notification.user) {
      return response.status(401).json({
        error: "You don't have permission to update this notification.",
      });
    }

    notification.read = true;
    notification.save();

    return response.json(notification);
  }
}

export default new NotificationController();
