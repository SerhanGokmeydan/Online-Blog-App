import {
  editPostFromDb,
  fetchAllPosts,
  pushPostToDb,
  deletePostFromDb,
  searchPostFromDb,
  addFavoritePostToDb,
  fetchPostById,
  getFavoritePostsByUser,
  searchPostInFavorites,
  removePostFromFavorites,
} from "../models/postModel.js";
import { fetchUserInfoById } from "../models/userModel.js";

//redirect posts
export const redirectPostsPage = (req, res) => {
  res.redirect("/posts");
};

// get all posts
export const allPostsPage = async (req, res) => {
  try {
    const posts = await fetchAllPosts();
    const userInfo = await Promise.all(
      posts.map(async (post) => {
        return await fetchUserInfoById(post.user_id);
      })
    );

    res.render("allPosts.ejs", { allPosts: posts, userInfo: userInfo });
  } catch (err) {
    console.log(err);
  }
};

//get a post
export const postPage = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = req.post;
    const userInfo = await fetchUserInfoById(post.user_id);
    const isFavorite = await searchPostInFavorites(userId, post.id);
    let valid;

    if (isFavorite) {
      valid = true;
    } else {
      valid = false;
    }

    res.render("post.ejs", {
      post: post,
      userInfo: userInfo,
      isFavorite: valid,
    });
  } catch (err) {
    console.log("post controller", err);
  }
};

//create post page
export const getCreatePostPage = (req, res) => {
  res.render("createPost.ejs");
};

//create post
export const createPost = async (req, res) => {
  try {
    const newPost = {
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      author: req.user.username,
      date: new Date().toISOString(),
      like: 0,
    };

    if (newPost.title && newPost.content) {
      await pushPostToDb(newPost);
    }
    res.redirect("/profile/" + req.user.id);
  } catch (err) {
    console.log("postController", err);
  }
};

//edit post page
export const editPostPage = (req, res) => {
  res.render("editPost.ejs", {
    post: req.post,
  });
};

//edit post
export const editPost = async (req, res) => {
  try {
    const updatedPost = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
    };

    await editPostFromDb(updatedPost);
    res.redirect("/profile/" + req.user.id);
  } catch (err) {
    console.log(err);
  }
};

//delete post
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await deletePostFromDb(id);
    res.redirect("/profile/" + req.user.id);
  } catch (err) {
    console.log("post controller", err);
  }
};

//search post page
export const searchPage = (req, res) => {
  res.render("search.ejs");
};

//search post
export const searchPost = async (req, res) => {
  try {
    const { title } = req.body;
    const posts = await searchPostFromDb(title);
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
  }
};

//add a post to favorites
export const addPostToFavorite = async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user.id;
    const isFavorite = await searchPostInFavorites(userId, postId);

    if (isFavorite) {
      await removePostFromFavorites(userId, postId);
    } else {
      await addFavoritePostToDb(userId, postId);
    }

    res.redirect("/post/" + postId)
  } catch (err) {
    console.log("post controller", err);
  }
};

//favorites page
export const favoritePostsPage = async (req, res) => {
  try {
    const userId = req.user.id;
    const favoritePosts = await getFavoritePostsByUser(userId);
    const userInfo = await Promise.all(
      favoritePosts.map(async (post) => {
        return await fetchUserInfoById(post.user_id);
      })
    ); 
    res.render("favoritePosts.ejs", { favoritePosts, userInfo });
  } catch (err) {
    console.log("post controller", err);
  }
};
