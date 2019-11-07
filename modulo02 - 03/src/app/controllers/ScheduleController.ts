import { Request, Response } from 'express';
import { parseISO, startOfDay, endOfDay, startOfToday } from 'date-fns';
import { Op } from 'sequelize';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';

class ScheduleController {
	async index(req: Request, res: Response) {
		const checkUserProvider = await User.findOne({
			where: { id: res.locals.userId, provider: true },
		});

		const date =
			(req.query.date && parseISO(req.query.date)) || startOfToday();

		const appointments = await Appointment.findAll({
			where: {
				provider_id: res.locals.userId,
				canceled_at: null,
				date: {
					[Op.between]: [startOfDay(date), endOfDay(date)],
				},
			},
			order: ['date'],
		});
		if (!checkUserProvider)
			return res.status(401).json({ error: 'user is not a provider' });
		return res.json(appointments);
	}
}

export default new ScheduleController();
