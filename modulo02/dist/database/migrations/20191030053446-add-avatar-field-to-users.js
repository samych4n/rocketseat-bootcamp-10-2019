"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'avatar_id', {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('users', 'avatar_id');
    },
};
//# sourceMappingURL=20191030053446-add-avatar-field-to-users.js.map