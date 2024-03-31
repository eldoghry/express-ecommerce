import express from "express";
import * as userController from "../controllers/user.controller";
import isAdmin from "../middlewares/isAdmin.middleware";
import validateToken from "./../middlewares/validate-token.middleware";
import canAccess from "../middlewares/canAccess.middleware";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", [validateToken, canAccess], userController.findOne);

export default router;
