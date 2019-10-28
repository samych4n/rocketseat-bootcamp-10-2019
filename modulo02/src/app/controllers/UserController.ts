import { Request, Response } from 'express';
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
		return res.json(true);
	}
}
export default new UserController();
