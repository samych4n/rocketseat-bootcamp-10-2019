"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Appointment extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            date: sequelize_1.DataTypes.DATE,
            canceled_at: sequelize_1.DataTypes.DATE,
        }, {
            sequelize,
        });
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=Appointment.js.map