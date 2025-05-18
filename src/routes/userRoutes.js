import express from "express";
import { profilePage } from "../controllers/userController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
// import { getUser } from "../middlewares/userMiddleware";

const router = express.Router();

router.get("/profile/:id", profilePage);

export default router;
