import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';
import { File } from '../models/File';
import notifications from '../schemas/Notification';
import Mail from '../../lib/Mail';

class AppointmentController {
	async index(req: Request, res: Response) {
		const { page = 1 } = req.query;
		const appointments = await Appointment.findAll({
			where: { user_id: res.locals.userId, canceled_at: null },
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
							attributes: ['path', 'url'],
						},
					],
				},
			],
			attributes: ['id', 'date'],
		});

		res.json(appointments);
	}

	async store(req: Request, res: Response) {
		if (!(await reqBodyIsValid(req.body)))
			return res.status(401).json({ error: 'Validation fails' });

		const { provider_id, date } = req.body;
		const provider = await User.findOne({
			where: { id: provider_id, provider: true },
		});
		if (!provider) {
			return res.status(401).json({
				error: 'You can only create appointments with providers',
			});
		}
		const hourStart = startOfHour(parseISO(date));

		if (isBefore(hourStart, new Date()))
			return res.status(400).json({
				error: 'Past date are not permited',
			});
		const checkAvaliability = await Appointment.findOne({
			where: {
				provider_id,
				canceled_at: null,
				date: <any>hourStart,
			},
		});
		if (checkAvaliability)
			return res.status(400).json({
				error: 'Appointment date is not available',
			});

		const appointment = await Appointment.create({
			user_id: res.locals.userId,
			provider_id,
			date: hourStart,
		});

		const formattedDate = format(
			hourStart,
			"'dia' dd 'de' MMMM', às' H:mm'hrs'",
			{ locale: ptBR }
		);

		const user = await User.findByPk(res.locals.userId);
		await notifications.create({
			content: `Novo agendamento de ${user.name} para ${formattedDate}`,
			user: provider_id,
		});

		return res.json(appointment);

		function reqBodyIsValid(body) {
			const schema = Yup.object().shape({
				date: Yup.date().required(),
				provider_id: Yup.number().required(),
			});
			return schema.isValid(body);
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const appointment = await Appointment.findOne({
			where: { id, user_id: res.locals.userId, canceled_at: null },
			include: [
				{ model: User, as: 'provider', attributes: ['name', 'email'] },
			],
		});
		if (!appointment)
			return res.status(401).json({ error: 'appointment not found' });

		const invalidDateToCancel = isBefore(
			subHours(appointment.date, 2),
			new Date()
		);
		if (invalidDateToCancel)
			return res.status(401).json({ error: 'cannot cancel anymore' });

		appointment.update({ canceled_at: new Date() });
		await Mail.sendMail({
			to: `${appointment.provider.name}<${appointment.provider.email}>`,
			subject: 'Agendamento Cancelado',
			text: 'Você tem um novo cancelamento',
		});
		return res.json(appointment);
	}
}
export default new AppointmentController();
