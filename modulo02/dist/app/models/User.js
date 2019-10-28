"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            name: sequelize_1.DataTypes.STRING,
            email: sequelize_1.DataTypes.STRING,
            password: sequelize_1.DataTypes.VIRTUAL,
            password_hash: sequelize_1.DataTypes.STRING,
            provider: sequelize_1.DataTypes.BOOLEAN,
        }, {
            sequelize,
        });
        this.addHook('beforeSave', user => {
            user.password_hash = password;
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map