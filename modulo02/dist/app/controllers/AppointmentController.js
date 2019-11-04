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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const Appointment_1 = require("../models/Appointment");
const User_1 = require("../models/User");
const File_1 = require("../models/File");
const Notification_1 = __importDefault(require("../schemas/Notification"));
const Mail_1 = __importDefault(require("../../lib/Mail"));
class AppointmentController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1 } = req.query;
            const appointments = yield Appointment_1.Appointment.findAll({
                where: { user_id: res.locals.userId, canceled_at: null },
                order: ['date'],
                limit: 20,
                offset: (page - 1) * 20,
                include: [
                    {
                        model: User_1.User,
                        as: 'provider',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: File_1.File,
                                as: 'avatar',
                                attributes: ['path', 'url'],
                            },
                        ],
                    },
                ],
                attributes: ['id', 'date'],
            });
            res.json(appointments);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield reqBodyIsValid(req.body)))
                return res.status(401).json({ error: 'Validation fails' });
            const { provider_id, date } = req.body;
            const provider = yield User_1.User.findOne({
                where: { id: provider_id, provider: true },
            });
            if (!provider) {
                return res.status(401).json({
                    error: 'You can only create appointments with providers',
                });
            }
            const hourStart = date_fns_1.startOfHour(date_fns_1.parseISO(date));
            if (date_fns_1.isBefore(hourStart, new Date()))
                return res.status(400).json({
                    error: 'Past date are not permited',
                });
            const checkAvaliability = yield Appointment_1.Appointment.findOne({
                where: {
                    provider_id,
                    canceled_at: null,
                    date: hourStart,
                },
            });
            if (checkAvaliability)
                return res.status(400).json({
                    error: 'Appointment date is not available',
                });
            const appointment = yield Appointment_1.Appointment.create({
                user_id: res.locals.userId,
                provider_id,
                date: hourStart,
            });
            const formattedDate = date_fns_1.format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'hrs'", { locale: locale_1.ptBR });
            const user = yield User_1.User.findByPk(res.locals.userId);
            yield Notification_1.default.create({
                content: `Novo agendamento de ${user.name} para ${formattedDate}`,
                user: provider_id,
            });
            return res.json(appointment);
            function reqBodyIsValid(body) {
                const schema = Yup.object().shape({
                    date: Yup.date().required(),
                    provider_id: Yup.number().required(),
                });
                return schema.isValid(body);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const appointment = yield Appointment_1.Appointment.findOne({
                where: { id, user_id: res.locals.userId, canceled_at: null },
                include: [
                    { model: User_1.User, as: 'provider', attributes: ['name', 'email'] },
                ],
            });
            if (!appointment)
                return res.status(401).json({ error: 'appointment not found' });
            const invalidDateToCancel = date_fns_1.isBefore(date_fns_1.subHours(appointment.date, 2), new Date());
            if (invalidDateToCancel)
                return res.status(401).json({ error: 'cannot cancel anymore' });
            // appointment.update({ canceled_at: new Date() });
            yield Mail_1.default.sendMail({
                to: `${appointment.provider.name}<${appointment.provider.email}>`,
                subject: 'Agendamento Cancelado',
                text: 'Você tem um novo cancelamento',
            });
            return res.json(appointment);
        });
    }
}
exports.default = new AppointmentController();
//# sourceMappingURL=AppointmentController.js.map