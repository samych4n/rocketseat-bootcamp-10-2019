"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const UserController_1 = __importDefault(require("./app/controllers/UserController"));
const SessionController_1 = __importDefault(require("./app/controllers/SessionController"));
const auth_1 = __importDefault(require("./app/middleware/auth"));
const FileController_1 = __importDefault(require("./app/controllers/FileController"));
const ProviderController_1 = __importDefault(require("./app/controllers/ProviderController"));
const AppointmentController_1 = __importDefault(require("./app/controllers/AppointmentController"));
const ScheduleController_1 = __importDefault(require("./app/controllers/ScheduleController"));
const NotificationController_1 = __importDefault(require("./app/controllers/NotificationController"));
const AvailableController_1 = __importDefault(require("./app/controllers/AvailableController"));
const routes = express_1.Router();
exports.routes = routes;
const upload = multer_1.default(multer_2.default);
routes.post('/users', UserController_1.default.store);
routes.post('/sessions', SessionController_1.default.store);
routes.use(auth_1.default);
routes.put('/users', UserController_1.default.update);
routes.get('/providers', ProviderController_1.default.index);
routes.get('/providers/:providerId/available', AvailableController_1.default.index);
routes.post('/files', upload.single('file'), FileController_1.default.store);
routes.get('/appointment', AppointmentController_1.default.index);
routes.post('/appointment', AppointmentController_1.default.store);
routes.delete('/appointment/:id', AppointmentController_1.default.delete);
routes.get('/schedule', ScheduleController_1.default.index);
routes.get('/notification', NotificationController_1.default.index);
routes.put('/notification/:id', NotificationController_1.default.update);
//# sourceMappingURL=routes.js.map