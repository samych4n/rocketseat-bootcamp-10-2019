import { Request, Response } from 'express';
import * as Yup from 'yup';
import { User } from '../models/User';

class UserController {
	async store(req: Request, res: Response) {
		if (await User.findOne({ where: { email: req.body.email } }))
			return res.status(400).json({ error: 'User already exists' });
		const user = await User.create(req.body);
		const { id, name, email, provider } = user;
		return res.json({ id, name, email, provider });
	}

	async update(req: Request, res: Response) {
		if (await checkBody(req))
			return res.status(400).json({ error: 'Validation fails' });

		const { oldPassword, email } = req.body;
		const user = await User.findByPk(res.locals.userId);

		if (
			email &&
			email !== user.email &&
			(await checkIfEmailIsInUse(email))
		) {
			res.status(400).json({ error: 'User already exists' });
		}

		if (oldPassword && !(await user.checkPassword(oldPassword)))
			return res.status(401).json({ error: 'Password does not match' });

		const userInfo = await user.update(req.body);
		return res.json({
			id: userInfo.id,
			name: userInfo.name,
			email: userInfo.email,
			provider: userInfo.provider,
		});

		function checkBody(req: Request) {
			const schema = Yup.object().shape({
				name: Yup.string().strict(true),
				email: Yup.string().email(),
				oldPassword: Yup.string()
					.strict(true)
					.min(6),
				password: Yup.string()
					.strict(true)
					.min(6)
					.when('oldPassword', (oldPassword, field) =>
						oldPassword ? field.required() : field
					),
				confirmPassword: Yup.string()
					.strict(true)
					.min(6)
					.when('oldPassword', (password, field) =>
						password
							? field.required().oneOf([Yup.ref('password')])
							: field
					),
			});
			return schema.isValid(req.body);
		}
		function checkIfEmailIsInUse(email: any) {
			return User.findOne({ where: { email } });
		}
	}
}
export default new UserController();
