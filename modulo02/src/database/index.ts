import { Sequelize, Options } from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import { User } from '../app/models/User';
import { File } from '../app/models/File';
import { Appointment } from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
	connection: Sequelize;

	mongoConnection: Promise<typeof mongoose>;

	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(<Options>databaseConfig);
		models.forEach(model => model.initialize(this.connection));
		models.forEach(
			model => model.associate && model.associate(this.connection.models)
		);
	}

	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://localhost:27017/gobarber',
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
			}
		);
	}
}

export default new Database();
