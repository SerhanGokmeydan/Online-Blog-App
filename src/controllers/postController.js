//redirect /posts
export const redirectPostsPage = (req, res) => {
  res.redirect("/posts")
}

// get all posts
export const fetchAllPosts = (req, res) => {
  res.render("allPosts.ejs")
}