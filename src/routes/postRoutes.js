import express from "express";
import {
  createPost,
  getCreatePostPage,
  postsPage,
  redirectPostsPage,
} from "../controllers/postController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

//posts
router.get("/", ensureAuthenticated, redirectPostsPage);
router.get("/posts", ensureAuthenticated, postsPage);

//create post
router.get("/create", ensureAuthenticated, getCreatePostPage);
router.post("/create", createPost);

export default router;
