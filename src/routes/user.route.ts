import express from "express";
import * as userController from "../controllers/user.controller";
import isAdmin from "../middlewares/isAdmin.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import canAccess from "../middlewares/canAccess.middleware";
import isValidMongoId from "../middlewares/isValidMongoId.middleware";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", [authMiddleware, isValidMongoId, canAccess], userController.findOne);

export default router;
