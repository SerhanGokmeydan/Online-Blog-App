import {
  editPostInDb,
  getAllPostsFromDb,
  addPostToDb,
  deletePostFromDb,
  searchPostsInDb,
  addFavoritePostToDb,
  getFavoritesFromDbByUser,
  findFavoriteInDb,
  deleteFavoriteFromDb,
} from "../models/postModel.js";
import { findUserInDbByUserId } from "../models/userModel.js";

//this func redirects the path to the home
export const redirectToHomePage = (req, res) => {
  try {
    res.redirect("/home");
  } catch (err) {
    console.log("post controller / redirect to home page:", err);
  }
};

// this func renders home page
export const renderHomePage = async (req, res) => {
  try {
    const posts = await getAllPostsFromDb();
    const userInfo = await Promise.all(
      posts.map(async (post) => {
        return await findUserInDbByUserId(post.user_id);
      })
    );

    res.render("home.ejs", { posts, userInfo });
  } catch (err) {
    console.log("post controller / render home page", err);
  }
};

//this func renders post page
export const renderPostPage = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = req.post;
    const userInfo = await findUserInDbByUserId(post.user_id);
    const isFavorite = await findFavoriteInDb(userId, post.id);

    res.render("post.ejs", {
      post,
      userInfo,
      isFavorite,
    });
  } catch (err) {
    console.log("post controller / render post page", err);
  }
};

//this func render create post page
export const renderCreatePostPage = (req, res) => {
  try {
    res.render("edit-create-post.ejs", { info: "create" });
  } catch (err) {
    console.log("post controller / render create post page:", err);
  }
};

//this func creates new post
export const createNewPost = async (req, res) => {
  try {
    const newPost = {
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      author: req.user.username,
    };

    if (newPost.title && newPost.content) {
      await addPostToDb(newPost);
    }
    res.redirect("/profile/" + req.user.id);
  } catch (err) {
    console.log("post controller / create new post", err);
  }
};

//this func renders edit post page
export const renderEditPostPage = (req, res) => {
  try {
    res.render("edit-create-post.ejs", {
      info: "edit",
      post: req.post,
    });
  } catch (err) {
    console.log("post controller / render edit post page:", err);
  }
};

//this func edits a post
export const editPost = async (req, res) => {
  try {
    const updatedPost = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
    };

    await editPostInDb(updatedPost);
    res.redirect("/profile/" + req.user.id);
  } catch (err) {
    console.log("post controller / edit post:", err);
  }
};

//this func deletes a post
export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    await deletePostFromDb(postId);

    res.redirect("/profile/" + userId);
  } catch (err) {
    console.log("post controller / delete post", err);
  }
};

//this func searches among posts
export const searchPosts = async (req, res) => {
  try {
    const title = req.body.title;
    const posts = await searchPostsInDb(title);
    const users = await Promise.all(
      posts.map(async (post) => {
        return await findUserInDbByUserId(post.user_id);
      })
    );

    res.status(200).json({ posts, users });
  } catch (err) {
    console.log("post controller / search posts:", err);
  }
};

//this func adds a post to favorite
export const addPostToFavorite = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.user.id;
    const isFavorite = await findFavoriteInDb(userId, postId);

    if (isFavorite) {
      await deleteFavoriteFromDb(userId, postId);
    } else {
      await addFavoritePostToDb(userId, postId);
    }

    res.status(200);
  } catch (err) {
    console.log("post controller / add post to favorite", err);
  }
};

//this func renders favorites page
export const renderFavoritesPage = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getFavoritesFromDbByUser(userId);
    const userInfo = await Promise.all(
      favorites.map(async (post) => {
        return await findUserInDbByUserId(post.user_id);
      })
    );

    res.render("home.ejs", { posts: favorites, userInfo });
  } catch (err) {
    console.log("post controller / render favorites page:", err);
  }
};
