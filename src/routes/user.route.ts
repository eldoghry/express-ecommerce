import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

router.get("/", userController.findAll);

export default router;
