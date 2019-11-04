import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import NodeMailer from 'nodemailer/lib/mailer';
import mail from '../config/mail';

class Mail {
	transport: NodeMailer;

	constructor() {
		const { auth, host, port, secure } = mail;
		console.log({
			host,
			port,
			secure,
			auth: auth.user ? auth : null,
		});
		this.transport = nodemailer.createTransport({
			host,
			port,
			auth: auth.user ? auth : null,
		});
	}

	sendMail(message: NodeMailer.Options) {
		return this.transport.sendMail({
			...mail.default,
			...message,
		});
	}
}
export default new Mail();
