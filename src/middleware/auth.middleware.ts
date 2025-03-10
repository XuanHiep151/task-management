import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserToken extends JwtPayload {
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied" });
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserToken;

        if (!decoded.role) {
            res.status(403).json({ message: "Invalid token: missing role" });
            return
        }

        req.user = decoded; // Gán thông tin user vào request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ message: "Forbidden: Admin access required" });
        return
    }
    next();
};
