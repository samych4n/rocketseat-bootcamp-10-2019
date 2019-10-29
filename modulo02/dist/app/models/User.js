"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    checkPassword(password) {
        return bcryptjs_1.default.compare(password, this.password_hash);
    }
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
        this.addHook('beforeSave', (user) => __awaiter(this, void 0, void 0, function* () {
            const data = user;
            if (data.password) {
                data.password_hash = yield bcryptjs_1.default.hash(data.password, 8);
            }
        }));
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map