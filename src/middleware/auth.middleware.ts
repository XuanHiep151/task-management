import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserToken extends JwtPayload {
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserToken;

        if (!decoded.role) {
            return res.status(403).json({ message: "Invalid token: missing role" });
        }

        req.user = decoded; // ✅ Bây giờ req.user chắc chắn có role
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};


export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    next();
};
// 