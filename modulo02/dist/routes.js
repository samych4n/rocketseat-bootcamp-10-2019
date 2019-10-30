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
const routes = express_1.Router();
exports.routes = routes;
const upload = multer_1.default(multer_2.default);
routes.post('/users', UserController_1.default.store);
routes.post('/sessions', SessionController_1.default.store);
routes.use(auth_1.default);
routes.put('/users', UserController_1.default.update);
routes.get('/providers', ProviderController_1.default.index);
routes.post('/files', upload.single('file'), FileController_1.default.store);
//# sourceMappingURL=routes.js.map