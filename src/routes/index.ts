import { Router } from "express";
import taskRoutes from "./task/index";
// import userRoutes from "./user/index";
import authRoutes from "./auth/index";

const router = Router();
router.use('/auth', authRoutes)

router.use('/task', taskRoutes)
// router.use('/user', userRoutes)

export default router;