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
exports.UserController = void 0;
const user_services_1 = require("../services/user.services");
class UserController {
    static listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = req.params;
                const pageNumber = page ? Number(page) : 1; // Nếu không có page, mặc định là 1
                const limitNumber = limit ? Number(limit) : 10; // Nếu không có limit, mặc định là 10
                const listData = yield user_services_1.UserService.getUsers(pageNumber, limitNumber);
                return res.status(200).json({ data: listData.data, currentPage: listData.currentPage, totalPages: listData.totalPages, totalRecords: listData.totalRecords });
            }
            catch (error) {
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
    ;
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map