import { getPostFromDbByPostId } from "../models/postModel.js";

//get a post by id from db
export const getPost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await getPostFromDbByPostId(postId);

  req.post = post;
  next();
};
