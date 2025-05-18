import { fetchPostById } from "../models/postModel.js";

//get a post by id from db
export const getPost = async (req, res, next) => {
  const id = req.params.id;
  const post = await fetchPostById(id);

  req.post = post;
  next();
};
