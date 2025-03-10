import { Router } from "express";
import { UserController } from "../../controllers/user.controller";

const router = Router();

router.get("/list", UserController.listUser);

export default router;
