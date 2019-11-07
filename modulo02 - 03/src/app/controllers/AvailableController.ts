import { Request, Response } from 'express';
import {
	startOfDay,
	endOfDay,
	setSeconds,
	setMinutes,
	setHours,
	format,
	isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';

class AvailableController {
	async index(req: Request, res: Response) {
		const { providerId } = req.params;
		const { date } = req.query;
		if (!date) return res.status(400).json({ error: 'Invalid date' });
		const user = await User.findOne({
			where: { id: providerId, provider: true },
		});
		if (!user) return res.status(401).json({ error: 'provider not found' });

		const searchDate = Number(date);

		const appointment = await Appointment.findAll({
			where: {
				provider_id: providerId,
				canceled_at: null,
				date: {
					[Op.between]: [
						startOfDay(searchDate),
						endOfDay(searchDate),
					],
				},
			},
		});

		const schedule = [
			'08:00',
			'09:00',
			'10:00',
			'11:00',
			'12:00',
			'13:00',
			'14:00',
			'15:00',
			'16:00',
			'17:00',
			'18:00',
			'19:00',
			'20:00',
		];

		const available = schedule.map(time => {
			const [hour, minute] = time.split(':');
			const value = setSeconds(
				setMinutes(setHours(searchDate, Number(hour)), Number(minute)),
				0
			);

			return {
				time,
				value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
				available:
					isAfter(value, new Date()) &&
					!appointment.some(a => format(a.date, 'HH:mm') === time),
			};
		});

		return res.json(available);
	}
}
export default new AvailableController();
