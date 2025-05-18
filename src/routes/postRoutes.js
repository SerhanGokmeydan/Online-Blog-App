import express from "express";
import {
  createPost,
  editPost,
  editPostPage,
  getCreatePostPage,
  allPostsPage,
  redirectPostsPage,
  postPage,
} from "../controllers/postController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
import { getPost } from "../middlewares/postMiddleware.js";

const router = express.Router();

//all posts
router.get("/", redirectPostsPage);
router.get("/posts", allPostsPage);

//a post
router.get("/post/:id", getPost, postPage);

//create post
router.get("/create", getCreatePostPage);
router.post("/create", createPost);

//edit post

router.get("/edit/:id", getPost, editPostPage);
router.post("/edit/:id", editPost);

export default router;
