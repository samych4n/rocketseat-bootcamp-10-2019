"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const date_fns_1 = require("date-fns");
class Appointment extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            date: sequelize_1.DataTypes.DATE,
            canceled_at: sequelize_1.DataTypes.DATE,
            past: {
                type: sequelize_1.DataTypes.VIRTUAL,
                get() {
                    return date_fns_1.isBefore(this.date, new Date());
                },
            },
            cancelable: {
                type: sequelize_1.DataTypes.VIRTUAL,
                get() {
                    return date_fns_1.isBefore(new Date(), date_fns_1.subHours(this.date, 2));
                },
            },
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