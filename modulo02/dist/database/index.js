"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = require("../app/models/User");
const models = [User_1.User];
class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new sequelize_1.Sequelize(database_1.default);
        models.forEach(model => {
            model.initialize(this.connection);
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=index.js.map