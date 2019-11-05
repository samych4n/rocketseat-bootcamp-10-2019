"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = __importDefault(require("../config/database"));
const User_1 = require("../app/models/User");
const File_1 = require("../app/models/File");
const Appointment_1 = require("../app/models/Appointment");
const mongo_1 = __importDefault(require("../config/mongo"));
const models = [User_1.User, File_1.File, Appointment_1.Appointment];
class Database {
    constructor() {
        this.init();
        this.mongo();
    }
    init() {
        this.connection = new sequelize_1.Sequelize(database_1.default);
        models.forEach(model => model.initialize(this.connection));
        models.forEach(model => model.associate && model.associate(this.connection.models));
    }
    mongo() {
        this.mongoConnection = mongoose_1.default.connect(mongo_1.default.url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=index.js.map