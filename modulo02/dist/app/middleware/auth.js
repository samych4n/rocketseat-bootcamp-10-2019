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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const auth_1 = __importDefault(require("../../config/auth"));
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: 'Token not provider' });
        }
        const [, token] = authorization.split(' ');
        try {
            const verify = util_1.promisify(jsonwebtoken_1.default.verify);
            const decoded = yield verify(token, auth_1.default.secret);
            res.locals.userId = decoded.id;
        }
        catch (e) {
            return res.status(401).json({ error: 'Token invalid' });
        }
        return next();
    });
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map