"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true }, // Thêm tên đầy đủ
    phoneNumber: { type: String, required: true, unique: true }, // Thêm số điện thoại
    role: { type: String, enum: ["user", "admin"], default: "user" },
    projectRoles: { type: [String], enum: ["pm", "ba", "dev", "test"], default: ["dev"] }, // Danh sách vai trò trong dự án
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map