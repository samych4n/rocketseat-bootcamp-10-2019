"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = require("path");
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const mail_1 = __importDefault(require("../config/mail"));
class Mail {
    constructor() {
        const { auth, host, port, secure } = mail_1.default;
        this.transport = nodemailer_1.default.createTransport({
            host,
            port: Number(port),
            auth: auth.user ? auth : null,
        });
        this.configureTempates();
    }
    configureTempates() {
        const viewPath = path_1.resolve(__dirname, '..', 'app', 'views', 'emails');
        this.transport.use('compile', nodemailer_express_handlebars_1.default({
            viewEngine: express_handlebars_1.default.create({
                layoutsDir: path_1.resolve(viewPath, 'layouts'),
                partialsDir: path_1.resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs',
            }),
            viewPath,
            extName: '.hbs',
        }));
    }
    sendMail(message) {
        return this.transport.sendMail(Object.assign(Object.assign({}, mail_1.default.default), message));
    }
}
exports.default = new Mail();
//# sourceMappingURL=Mail.js.map