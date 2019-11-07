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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const path_1 = __importDefault(require("path"));
const Sentry = __importStar(require("@sentry/node"));
const youch_1 = __importDefault(require("youch"));
const routes_1 = require("./routes");
const sentry_1 = __importDefault(require("./config/sentry"));
require("./database");
const app = express_1.default();
exports.app = app;
Sentry.init(sentry_1.default);
app.use(Sentry.Handlers.requestHandler());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(routes_1.routes);
app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'development') {
        const errors = yield new youch_1.default(err, req).toJSON();
        return res.status(500).json(errors);
    }
    return res.status(500).json({ error: 'Internal server error' });
}));
//# sourceMappingURL=app.js.map