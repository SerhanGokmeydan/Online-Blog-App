import express from "express";
import {
  fetchAllPosts,
  redirectPostsPage,
} from "../controllers/postController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

//posts
router.get("/", ensureAuthenticated, redirectPostsPage);

router.get("/posts", ensureAuthenticated, fetchAllPosts);

export default router;
