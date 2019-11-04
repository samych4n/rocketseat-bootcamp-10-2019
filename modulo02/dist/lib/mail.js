"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_1 = __importDefault(require("../config/mail"));
class Mail {
    constructor() {
        const { auth, host, port, secure } = mail_1.default;
        console.log({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });
        this.transport = nodemailer_1.default.createTransport({
            host,
            port,
            auth: auth.user ? auth : null,
        });
    }
    sendMail(message) {
        return this.transport.sendMail(Object.assign(Object.assign({}, mail_1.default.default), message));
    }
}
exports.default = new Mail();
//# sourceMappingURL=mail.js.map