import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.services";
export class AuthController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;

      const createData = await UserService.createUser(data)
      switch (createData) {
        case "username":
          return res.status(400).json({ message: "username đã tồn tại" });
        case "phone":
          return res.status(400).json({ message: "số điện thoại đã tồn tại" });
        default:
          return res.status(201).json({ message: "Đăng ký thành công" });
      }

    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { username, password } = req.body;

      const user = await UserService.getUserByUsernameAndPass(username, password);
      if (user == null) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, role: user.role, phoneNumber: user.phoneNumber, fullName: user.fullName }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
}