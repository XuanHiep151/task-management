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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_services_1 = require("../services/user.services");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const createData = yield user_services_1.UserService.createUser(data);
                switch (createData) {
                    case "username":
                        return res.status(400).json({ message: "username đã tồn tại" });
                    case "phone":
                        return res.status(400).json({ message: "số điện thoại đã tồn tại" });
                    default:
                        return res.status(201).json({ message: "Đăng ký thành công" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
    ;
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_services_1.UserService.getUserByUsernameAndPass(username, password);
                if (user == null)
                    return res.status(400).json({ message: "Invalid credentials" });
                const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, phoneNumber: user.phoneNumber, fullName: user.fullName }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return res.json({ token });
            }
            catch (error) {
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
    ;
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map