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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
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
            if (yield checkBody(req))
                return res.status(400).json({ error: 'Validation fails' });
            const { oldPassword, email } = req.body;
            const user = yield User_1.User.findByPk(res.locals.userId);
            if (email &&
                email !== user.email &&
                (yield checkIfEmailIsInUse(email))) {
                res.status(400).json({ error: 'User already exists' });
            }
            if (oldPassword && !(yield user.checkPassword(oldPassword)))
                return res.status(401).json({ error: 'Password does not match' });
            const userInfo = yield user.update(req.body);
            return res.json({
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                provider: userInfo.provider,
            });
            function checkBody(req) {
                const schema = Yup.object().shape({
                    name: Yup.string().strict(true),
                    email: Yup.string().email(),
                    oldPassword: Yup.string()
                        .strict(true)
                        .min(6),
                    password: Yup.string()
                        .strict(true)
                        .min(6)
                        .when('oldPassword', (oldPassword, field) => oldPassword ? field.required() : field),
                    confirmPassword: Yup.string()
                        .strict(true)
                        .min(6)
                        .when('oldPassword', (password, field) => password
                        ? field.required().oneOf([Yup.ref('password')])
                        : field),
                });
                return schema.isValid(req.body);
            }
            function checkIfEmailIsInUse(email) {
                return User_1.User.findOne({ where: { email } });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map