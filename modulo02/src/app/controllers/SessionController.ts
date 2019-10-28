import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { User } from '../models/User';

class SessionController {
	async store(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}
		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const { id, name } = user;
		return res.json({
			user: {
				id,
				name,
				email,
			},
			token: jwt.sign({ id, name, email }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}
export default new SessionController();
