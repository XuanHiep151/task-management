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
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, fullName, phoneNumber, role, projectRoles } = data;
            // Kiểm tra username trước
            const existingUsername = yield user_model_1.default.findOne({ username: data.username });
            if (existingUsername) {
                return "username";
            }
            // Kiểm tra phoneNumber
            const existingPhone = yield user_model_1.default.findOne({ phoneNumber: data.phoneNumber });
            if (existingPhone) {
                return "phone";
            }
            // Mã hóa mật khẩu
            const hashedPassword = yield bcryptjs_1.default.hash(password, 15);
            // Tạo user mới
            const user = new user_model_1.default({
                username,
                password: hashedPassword,
                fullName,
                phoneNumber,
                role,
                projectRoles: projectRoles || [], // Nếu không có thì mặc định là []
            });
            yield user.save();
            return user;
        });
    }
    ;
    static getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUsername = yield user_model_1.default.findOne({ username: username });
            if (existingUsername) {
                return existingUsername;
            }
            return null;
        });
    }
    ;
    static getUserByUsernameAndPass(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Tìm user theo username
            const existingUser = yield user_model_1.default.findOne({ username });
            if (!existingUser) {
                return null; // Không tìm thấy user
            }
            // So sánh mật khẩu nhập vào với mật khẩu đã hash trong database
            const isMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
            if (!isMatch) {
                return null; // Sai mật khẩu
            }
            return existingUser; // Đúng username & password
        });
    }
    static getUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit; // Tính số bản ghi cần bỏ qua
            // Lấy danh sách user (bỏ password)
            const data = yield user_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .select("-password");
            // Đếm tổng số bản ghi trong DB
            const totalRecords = yield user_model_1.default.countDocuments();
            return {
                totalRecords, // Tổng số bản ghi
                totalPages: Math.ceil(totalRecords / limit), // Tổng số trang
                currentPage: page,
                data
            };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map