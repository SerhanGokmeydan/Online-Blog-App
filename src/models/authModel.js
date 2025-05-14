import db from "../config/db.js";

//registration db
export const registerUser = async (username, password, date) => {
  try {
    await db.query(
      "insert into users (username, password, date) values ($1, $2, $3)",
      [username, password, date]
    );
  } catch (err) {
    console.log("authModel:" + err);
  }
};

//passport db
export const findUserByUsername = async (username) => {
  try {
    const result = await db.query("select * from users where username = $1", [username]);
    const user = result.rows[0];
    return user;
  } catch (err) {
    console.log("authModel:" + err);
  }
};
