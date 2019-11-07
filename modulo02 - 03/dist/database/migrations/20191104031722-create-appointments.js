"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
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
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            provider_id: {
                type: sequelize_1.DataTypes.INTEGER,
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('appointments');
    },
};
//# sourceMappingURL=20191104031722-create-appointments.js.map