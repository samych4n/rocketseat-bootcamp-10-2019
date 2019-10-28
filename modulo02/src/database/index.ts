import { Sequelize, Options } from 'sequelize';
import databaseConfig from '../config/database';
import { User } from '../app/models/User';

const models = [User];

class Database {
	connection: Sequelize;

	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(<Options>databaseConfig);
		models.forEach(model => {
			model.initialize(this.connection);
		});
	}
}

export default new Database();
