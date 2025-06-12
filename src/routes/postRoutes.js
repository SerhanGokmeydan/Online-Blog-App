import express from "express";
import {
  createNewPost,
  editPost,
  renderEditPostPage,
  renderCreatePostPage,
  renderHomePage,
  redirectToHomePage,
  renderPostPage,
  deletePost,  
  searchPosts,
  addPostToFavorite,
  renderFavoritesPage,
} from "../controllers/postController.js";
import { getPost } from "../middlewares/postMiddleware.js";

const router = express.Router();

//all posts
router.get("/", redirectToHomePage);
router.get("/home", renderHomePage);

//a post
router.get("/post/:id", getPost, renderPostPage);

//create post
router.get("/create", renderCreatePostPage);
router.post("/create", createNewPost);

//edit post

router.get("/edit-post/:id", getPost, renderEditPostPage);
router.post("/edit-post/:id", editPost);

//delete post
router.get("/delete-post/:id", deletePost)

//search post
router.post("/search-post", searchPosts)

//add a post to favorites
router.post("/favorite/", addPostToFavorite)

//favorite posts page
router.get("/favorites", renderFavoritesPage)

export default router;
