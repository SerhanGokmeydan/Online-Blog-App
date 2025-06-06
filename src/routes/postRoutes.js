import express from "express";
import {
  createPost,
  editPost,
  editPostPage,
  getCreatePostPage,
  allPostsPage,
  redirectPostsPage,
  postPage,
  deletePost,  
  searchPost,
  searchPage,
  addPostToFavorite,
  favoritePostsPage,
} from "../controllers/postController.js";
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

router.get("/edit-post/:id", getPost, editPostPage);
router.post("/edit-post/:id", editPost);

//delete post
router.post("/delete-post/:id", deletePost)

//search post page
router.get("/search", searchPage)

//search post
router.post("/search-post", searchPost)

//add a post to favorites
router.post("/favorite", addPostToFavorite)

//favorite posts page
router.get("/favorite-posts", favoritePostsPage)

export default router;
