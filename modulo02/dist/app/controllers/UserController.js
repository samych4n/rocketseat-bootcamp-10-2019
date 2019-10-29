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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield User_1.User.findOne({ where: { email: req.body.email } }))
                return res.status(400).json({ error: 'User already exists' });
            const user = yield User_1.User.create(req.body);
            const { id, name, email, provider } = user;
            return res.json({ id, name, email, provider });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json(true);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map