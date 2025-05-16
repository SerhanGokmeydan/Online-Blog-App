import { fetchAllPosts, pushPostToDb } from "../models/postModel.js";

//redirect posts
export const redirectPostsPage = (req, res) => {
  res.redirect("/posts");
};

// get all posts
export const postsPage = async (req, res) => {
  const posts = await fetchAllPosts();
  console.log(posts)
  res.render("allPosts.ejs", { posts: posts });
};

//create post page
export const getCreatePostPage = (req, res) => {
  res.render("createPost.ejs");
};

export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const title = req.body.title;
    const content = req.body.content;
    const author = req.user.username;
    const date = new Date().toDateString();
    const like = 0;

    if(title && content){
      await pushPostToDb(userId, title, content, author, date, like)
    }
    res.redirect("/posts")
  } catch (err) {
    console.log("postController", err);
  }
};
