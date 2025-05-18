// import { fetchAllUsers } from "../models/userModel";

// export const getUser = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const users = await fetchAllUsers();

//     const user = users.find((user) => {
//       return user.id == id;
//     });
//     req.user = user;
//     next();
//   } catch (err) {
//     console.log("user middleware", err);
//   }
// };
