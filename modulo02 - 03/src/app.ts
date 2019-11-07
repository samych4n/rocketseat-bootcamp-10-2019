import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import { routes } from './routes';
import sentryConfig from './config/sentry';

import './database';

const app = express();
Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());
app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'development') {
		const errors = await new Youch(err, req).toJSON();
		return res.status(500).json(errors);
	}
	return res.status(500).json({ error: 'Internal server error' });
});

export { app };
