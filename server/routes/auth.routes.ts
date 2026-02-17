import express, { Router } from "express";
import { signUpController,loginController } from "../controllers/index.ts";

const router: Router = express.Router();

router.post("/sign-up", signUpController);
router.post("/login", loginController);

export default router;
