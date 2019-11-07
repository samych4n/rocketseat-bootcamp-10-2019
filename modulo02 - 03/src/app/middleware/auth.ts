import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import { promisifyJwt } from '../../types';

export default async function(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: 'Token not provider' });
	}

	const [, token] = authorization.split(' ');

	try {
		const verify: promisifyJwt = promisify(jwt.verify);
		const decoded = await verify(token, authConfig.secret);
		res.locals.userId = decoded.id;
	} catch (e) {
		return res.status(401).json({ error: 'Token invalid' });
	}
	return next();
}
