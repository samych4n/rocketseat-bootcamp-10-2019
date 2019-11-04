import { Request, Response } from 'express';
import Notification from '../schemas/Notification';
import { User } from '../models/User';

class NotificationController {
	async index(req: Request, res: Response) {
		const user = User.findOne({
			where: { id: res.locals.userId, provider: true },
		});
		if (!user)
			res.status(400).json({ error: 'only providers can access this' });

		const notifications = await Notification.find({
			user: res.locals.userId,
		})
			.sort({ createdAt: 'desc' })
			.limit(20);

		return res.json(notifications);
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const notification = await Notification.findByIdAndUpdate(
			id,
			{ read: true },
			{ new: true }
		);
		return res.json(notification);
	}
}
export default new NotificationController();
