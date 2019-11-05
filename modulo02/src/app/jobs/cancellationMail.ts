import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Mail from '../../lib/Mail';
import { Appointment } from '../models/Appointment';

type handle = { data: { appointment: Appointment } };

class CancellationMail {
	get key() {
		return 'CancellationMail';
	}

	async handle({ data }: handle) {
		const { appointment } = data;
		await Mail.sendMail({
			to: `${appointment.provider.name}<${appointment.provider.email}>`,
			subject: 'Agendamento Cancelado',
			template: 'cancellation',
			context: {
				provider: appointment.provider.name,
				user: appointment.user.name,
				date: format(
					parseISO(<any>appointment.date),
					"'dia' dd 'de' MMMM', às' H:mm'hrs'",
					{ locale: ptBR }
				),
			},
		});
	}
}

export default new CancellationMail();
