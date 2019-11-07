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
const date_fns_1 = require("date-fns");
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const Appointment_1 = require("../models/Appointment");
class ScheduleController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUserProvider = yield User_1.User.findOne({
                where: { id: res.locals.userId, provider: true },
            });
            const date = (req.query.date && date_fns_1.parseISO(req.query.date)) || date_fns_1.startOfToday();
            const appointments = yield Appointment_1.Appointment.findAll({
                where: {
                    provider_id: res.locals.userId,
                    canceled_at: null,
                    date: {
                        [sequelize_1.Op.between]: [date_fns_1.startOfDay(date), date_fns_1.endOfDay(date)],
                    },
                },
                order: ['date'],
            });
            if (!checkUserProvider)
                return res.status(401).json({ error: 'user is not a provider' });
            return res.json(appointments);
        });
    }
}
exports.default = new ScheduleController();
//# sourceMappingURL=ScheduleController.js.map