import nodemailer from 'nodemailer';
import { resolve } from 'path';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import NodeMailer from 'nodemailer/lib/mailer';
import { string } from 'yup';
import mail from '../config/mail';

class Mail {
	transport: NodeMailer;

	constructor() {
		const { auth, host, port, secure } = mail;
		this.transport = nodemailer.createTransport({
			host,
			port,
			auth: auth.user ? auth : null,
		});

		this.configureTempates();
	}

	configureTempates() {
		const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
		this.transport.use(
			'compile',
			nodemailerhbs({
				viewEngine: exphbs.create({
					layoutsDir: resolve(viewPath, 'layouts'),
					partialsDir: resolve(viewPath, 'partials'),
					defaultLayout: 'default',
					extname: '.hbs',
				}),
				viewPath,
				extName: '.hbs',
			})
		);
	}

	sendMail(
		message: NodeMailer.Options & { template?: string; context?: any }
	) {
		return this.transport.sendMail({
			...mail.default,
			...message,
		});
	}
}
export default new Mail();
