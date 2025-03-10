import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true }, // Thêm tên đầy đủ
  phoneNumber: { type: String, required: true, unique: true }, // Thêm số điện thoại
  role: { type: String, enum: ["user", "admin"], default: "user" },
  projectRoles: { type: [String], enum: ["pm", "ba", "dev", "test"], default: ["dev"] }, // Danh sách vai trò trong dự án
});

export default mongoose.model("User", UserSchema);
