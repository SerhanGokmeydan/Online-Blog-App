import { fetchPostsByUser, fetchUserInfoById } from "../models/userModel.js";

export const profilePage = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await fetchUserInfoById(id);
    const posts = await fetchPostsByUser(id);
    
    res.render("profile.ejs", {
      user: { ...user, posts: posts },
    });
  } catch (err) {
    console.log("user controller", err);
  }
};
