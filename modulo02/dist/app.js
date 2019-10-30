"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
require("./database");
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(routes_1.routes);
//# sourceMappingURL=app.js.map