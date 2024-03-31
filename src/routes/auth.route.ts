import express from "express";
import * as authController from "../controllers/auth.controller";
import { validateDtoMiddleware } from "../middlewares/error-handler.middleware";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";

const router = express.Router();

router.post("/login", validateDtoMiddleware(LoginDto), authController.login);
router.post("/register", validateDtoMiddleware(RegisterDto), authController.register);

export default router;
