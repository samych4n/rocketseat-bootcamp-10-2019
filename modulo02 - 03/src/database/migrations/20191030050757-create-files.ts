import sequelize, { QueryInterface, DataTypes } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, Sequelize: typeof sequelize) => {
		return queryInterface.createTable('files', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			path: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: (queryInterface: QueryInterface, Sequelize: typeof sequelize) => {
		return queryInterface.dropTable('files');
	},
};
