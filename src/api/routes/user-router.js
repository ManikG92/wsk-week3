import express from "express";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.js";
import { getCatsByUser } from "../controllers/cat-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.route("/").get(getUser).post(postUser); // Registration remains public

userRouter
  .route("/:id")
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

userRouter.route("/:id/cats").get(getCatsByUser);

export default userRouter;
