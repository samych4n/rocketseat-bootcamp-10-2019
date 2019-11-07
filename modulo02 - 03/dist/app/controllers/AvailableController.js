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
class AvailableController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId } = req.params;
            const { date } = req.query;
            if (!date)
                return res.status(400).json({ error: 'Invalid date' });
            const user = yield User_1.User.findOne({
                where: { id: providerId, provider: true },
            });
            if (!user)
                return res.status(401).json({ error: 'provider not found' });
            const searchDate = Number(date);
            const appointment = yield Appointment_1.Appointment.findAll({
                where: {
                    provider_id: providerId,
                    canceled_at: null,
                    date: {
                        [sequelize_1.Op.between]: [
                            date_fns_1.startOfDay(searchDate),
                            date_fns_1.endOfDay(searchDate),
                        ],
                    },
                },
            });
            const schedule = [
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
            ];
            const available = schedule.map(time => {
                const [hour, minute] = time.split(':');
                const value = date_fns_1.setSeconds(date_fns_1.setMinutes(date_fns_1.setHours(searchDate, Number(hour)), Number(minute)), 0);
                return {
                    time,
                    value: date_fns_1.format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                    available: date_fns_1.isAfter(value, new Date()) &&
                        !appointment.some(a => date_fns_1.format(a.date, 'HH:mm') === time),
                };
            });
            return res.json(available);
        });
    }
}
exports.default = new AvailableController();
//# sourceMappingURL=AvailableController.js.map