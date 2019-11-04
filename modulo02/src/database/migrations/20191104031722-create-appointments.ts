import sequelize, { QueryInterface, DataTypes } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, Sequelize: typeof sequelize) => {
		return queryInterface.createTable('appointments', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			provider_id: {
				type: DataTypes.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			canceled_at: {
				type: Sequelize.DATE,
				allowNull: true,
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
		return queryInterface.dropTable('appointments');
	},
};
