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
const User_1 = require("../models/User");
const File_1 = require("../models/File");
class ProviderController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const providers = yield User_1.User.findAll({
                where: { provider: true },
                attributes: ['id', 'name', 'email', 'avatar_id'],
                include: [
                    {
                        model: File_1.File,
                        as: 'avatar',
                        attributes: ['name', 'path', 'url'],
                    },
                ],
            });
            return res.json(providers);
        });
    }
}
exports.default = new ProviderController();
//# sourceMappingURL=ProviderController.js.map