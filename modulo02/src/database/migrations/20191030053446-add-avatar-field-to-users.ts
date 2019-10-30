import sequelize, { QueryInterface, DataTypes } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, Sequelize: typeof sequelize) => {
		return queryInterface.addColumn('users', 'avatar_id', {
			type: DataTypes.INTEGER,
			references: { model: 'files', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
			allowNull: true,
		});
	},

	down: (queryInterface: QueryInterface, Sequelize: typeof sequelize) => {
		return queryInterface.removeColumn('users', 'avatar_id');
	},
};
