import {
  editPostFromDb,
  fetchAllPosts,
  pushPostToDb,
} from "../models/postModel.js";

//redirect posts
export const redirectPostsPage = (req, res) => {
  res.redirect("/posts");
};

// get all posts
export const allPostsPage = async (req, res) => {
  try{
    const posts = await fetchAllPosts();
    res.render("allPosts.ejs", { allPosts: posts });
  } catch (err){
    console.log(err)
  }
};

//get a post
export const postPage = (req, res) => {
  res.render("post.ejs", {
    post: req.post,
  });
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
  try{
    const updatedPost = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
    };
  
    await editPostFromDb(updatedPost);
    res.redirect("/profile/" + req.user.id);
  } catch(err){
    console.log(err)
  }
};
