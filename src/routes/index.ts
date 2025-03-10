import { Router } from "express";
import taskRoutes from "./task/index";
import userRoutes from "./user/index";
import authRoutes from "./auth/index";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.use('/auth', authRoutes)
router.use(authMiddleware)
router.use('/task', taskRoutes)
router.use('/user', userRoutes)

export default router;