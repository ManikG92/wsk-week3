import express from "express";
import { body } from "express-validator";
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.js";
import { getCatsByUser } from "../controllers/cat-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";
import { validationErrors } from "../../middlewares/error-handlers.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUser)
  .post(
    body("email").trim().isEmail().withMessage("Valid email required"),
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric()
      .withMessage("Username must be 3-20 alphanumeric characters"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    validationErrors,
    postUser,
  );

userRouter
  .route("/:id")
  .get(getUserById)
  .put(
    authenticateToken,
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Valid email required"),
    body("username")
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric(),
    body("password").optional().trim().isLength({ min: 8 }),
    validationErrors,
    putUser,
  )
  .delete(authenticateToken, deleteUser);

userRouter.route("/:id/cats").get(getCatsByUser);

export default userRouter;
