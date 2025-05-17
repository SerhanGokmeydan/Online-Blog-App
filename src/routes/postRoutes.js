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
router.get("/", ensureAuthenticated, redirectPostsPage);
router.get("/posts", ensureAuthenticated, allPostsPage);

//a post
router.get("/post/:id", ensureAuthenticated, getPost, postPage);

//create post
router.get("/create", ensureAuthenticated, getCreatePostPage);
router.post("/create", ensureAuthenticated, createPost);

//edit post

router.get("/edit/:id", ensureAuthenticated, getPost, editPostPage);
router.post("/edit/:id", ensureAuthenticated, editPost);

export default router;
