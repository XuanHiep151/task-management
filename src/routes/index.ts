import { Router } from "express";
import taskRoutes from "./task/index";
import userRoutes from "./user/index";

const router = Router();

router.use('/task', taskRoutes)
router.use('/user', userRoutes)

export default router;