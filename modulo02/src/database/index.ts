import { Sequelize, Options } from 'sequelize';
import databaseConfig from '../config/database';
import { User } from '../app/models/User';
import { File } from '../app/models/File';

const models = [User, File];

class Database {
	connection: Sequelize;

	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(<Options>databaseConfig);
		models.forEach(model => model.initialize(this.connection));
		models.forEach(
			model => model.associate && model.associate(this.connection.models)
		);
	}
}

export default new Database();
