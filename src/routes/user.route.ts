import express from "express";
import * as userController from "../controllers/user.controller";
import isAdmin from "../middlewares/isAdmin.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import canAccess from "../middlewares/canAccess.middleware";
import isValidMongoId from "../middlewares/isValidMongoId.middleware";
import { validateDtoMiddleware } from "../middlewares/error-handler.middleware";
import { UpdateUserDto } from "../dtos/user.dto";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", [authMiddleware, isValidMongoId, canAccess], userController.findOne);
router.patch("/:id", [authMiddleware, isValidMongoId, canAccess, validateDtoMiddleware(UpdateUserDto)], userController.updateOne);
router.delete("/:id", [authMiddleware, isValidMongoId, isAdmin], userController.deleteOne);

router.post("/:id/block", [authMiddleware, isValidMongoId, isAdmin], userController.blockUser);
router.post("/:id/activate", [authMiddleware, isValidMongoId, isAdmin], userController.unblockUser);

export default router;
