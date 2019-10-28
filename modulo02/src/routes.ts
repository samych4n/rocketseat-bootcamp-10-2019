import { Router } from 'express';
import { User } from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.put('/users', UserController.update);

routes.get('/', async (req, res) => {
	const user = await User.create({
		name: 'Samuel Costa',
		email: 'lelouchds@gmail.com',
		password_hash: '1234',
	});
	res.json(user);
});

export { routes };
