import { GetPublicKeyOrSecret } from 'jsonwebtoken';
import { Model } from 'sequelize';

export type promisifyJwt = (
	token: string,
	secret:
		| string
		| Buffer
		| { key: string | Buffer; passphrase: string }
		| GetPublicKeyOrSecret
) => Promise<string | Object | any>;

export type customModel = Model & { associate?: (Array: Model) => void };
