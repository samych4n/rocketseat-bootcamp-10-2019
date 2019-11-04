"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
    },
    user: {
        type: Number,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Notification', NotificationSchema);
//# sourceMappingURL=notifications.js.map