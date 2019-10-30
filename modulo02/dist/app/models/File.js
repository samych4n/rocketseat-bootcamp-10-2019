"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class File extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            name: sequelize_1.DataTypes.STRING,
            path: sequelize_1.DataTypes.STRING,
            url: {
                type: sequelize_1.DataTypes.VIRTUAL,
                get() {
                    return `http://localhost:3333/files/${this.path}`;
                },
            },
        }, {
            sequelize,
        });
    }
    static associate(models) { }
}
exports.File = File;
//# sourceMappingURL=File.js.map