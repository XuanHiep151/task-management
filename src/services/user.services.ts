import bcrypt from "bcryptjs";
import User from "../models/user.model";
export class UserService {
    static async createUser(data: {
        username: string;
        password: string;
        fullName: string;
        phoneNumber: string;
        role: string;
        projectRoles?: string[];
    }) {
        const { username, password, fullName, phoneNumber, role, projectRoles } = data;

        // Kiểm tra username trước
        const existingUsername = await User.findOne({ username: data.username });
        if (existingUsername) {
            return "username"
        }

        // Kiểm tra phoneNumber
        const existingPhone = await User.findOne({ phoneNumber: data.phoneNumber });
        if (existingPhone) {
            return "phone"
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 15);

        // Tạo user mới
        const user = new User({
            username,
            password: hashedPassword,
            fullName,
            phoneNumber,
            role,
            projectRoles: projectRoles || [], // Nếu không có thì mặc định là []
        });

        await user.save();
        return user;
    };
    static async getUserByUsername(
        username: string
    ) {
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return existingUsername
        }
        return null
    };
    static async getUserByUsernameAndPass(username: string, password: string) {
        // Tìm user theo username
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return null; // Không tìm thấy user
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã hash trong database
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return null; // Sai mật khẩu
        }

        return existingUser; // Đúng username & password
    }
    static async getUsers(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit; // Tính số bản ghi cần bỏ qua
    
        // Lấy danh sách user (bỏ password)
        const data = await User.find()
            .skip(skip)
            .limit(limit)
            .select("-password");
    
        // Đếm tổng số bản ghi trong DB
        const totalRecords = await User.countDocuments();
    
        return {
            totalRecords, // Tổng số bản ghi
            totalPages: Math.ceil(totalRecords / limit), // Tổng số trang
            currentPage: page,
            data
        };
    }
    

}