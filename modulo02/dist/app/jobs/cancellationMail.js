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
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const Mail_1 = __importDefault(require("../../lib/Mail"));
class CancellationMail {
    get key() {
        return 'CancellationMail';
    }
    handle({ data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appointment } = data;
            yield Mail_1.default.sendMail({
                to: `${appointment.provider.name}<${appointment.provider.email}>`,
                subject: 'Agendamento Cancelado',
                template: 'cancellation',
                context: {
                    provider: appointment.provider.name,
                    user: appointment.user.name,
                    date: date_fns_1.format(date_fns_1.parseISO(appointment.date), "'dia' dd 'de' MMMM', às' H:mm'hrs'", { locale: locale_1.ptBR }),
                },
            });
        });
    }
}
exports.default = new CancellationMail();
//# sourceMappingURL=cancellationMail.js.map