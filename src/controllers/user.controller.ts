import { Request, Response } from "express";
import { UserService } from "../services/user.services";
export class UserController {
    static async listUser(req: Request, res: Response): Promise<any> {
        try {
            const { page, limit } = req.params;
            const pageNumber = page ? Number(page) : 1;  // Nếu không có page, mặc định là 1
            const limitNumber = limit ? Number(limit) : 10; // Nếu không có limit, mặc định là 10
            const listData = await UserService.getUsers(pageNumber, limitNumber)
            return res.status(200).json({ data: listData.data, currentPage: listData.currentPage, totalPages: listData.totalPages, totalRecords: listData.totalRecords });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };
}