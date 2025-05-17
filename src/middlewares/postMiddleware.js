import { fetchAllPosts } from "../models/postModel.js";

//get a post by id from db
export const getPost = async (req, res, next) => {
  const posts = await fetchAllPosts();
  const id = req.params.id;

  const post = posts.find((post) => {
    return post.id == id;
  });

  req.post = post;
  next();
};
