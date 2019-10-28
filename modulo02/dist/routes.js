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
const express_1 = require("express");
const User_1 = require("./app/models/User");
const UserController_1 = __importDefault(require("./app/controllers/UserController"));
const routes = express_1.Router();
exports.routes = routes;
routes.post('/users', UserController_1.default.store);
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.create({
        name: 'Samuel Costa',
        email: 'lelouchds@gmail.com',
        password_hash: '1234',
    });
    res.json(user);
}));
//# sourceMappingURL=routes.js.map