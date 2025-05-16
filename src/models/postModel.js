import db from "../config/db.js";

export const fetchAllPosts = async () => {
  const result = await db.query("select * from posts");
  const posts = result.rows;
  return posts;
};

export const pushPostToDb = async (
  user_id,
  title,
  content,
  author,
  date,
  likes
) => {
  try {
    await db.query(
      "insert into posts (user_id, title, content, author, date, likes) values ($1, $2, $3, $4, $5, $6)",
      [user_id, title, content, author, date, likes]
    );
  } catch (err) {
    console.log("postModel", err);
  }
};
