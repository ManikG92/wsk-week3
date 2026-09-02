import express from "express";
import { body } from "express-validator";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";
import { upload, createThumbnail } from "../../middlewares/upload.js";
import { authenticateToken } from "../../middlewares/authentication.js";
import { validationErrors } from "../../middlewares/error-handlers.js";

const catRouter = express.Router();

catRouter
  .route("/")
  .get(getCat)
  .post(
    authenticateToken,
    upload.single("cat"),
    body("cat_name")
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("cat_name must be between 3 and 50 characters"),
    body("weight")
      .isFloat({ min: 0.1 })
      .withMessage("weight must be a positive number"),
    body("birthdate")
      .isDate()
      .withMessage("birthdate must be a valid date (YYYY-MM-DD)"),
    validationErrors,
    createThumbnail,
    postCat,
  );

catRouter
  .route("/:id")
  .get(getCatById)
  .put(
    authenticateToken,
    body("cat_name").optional().trim().isLength({ min: 3, max: 50 }),
    body("weight").optional().isFloat({ min: 0.1 }),
    body("birthdate").optional().isDate(),
    validationErrors,
    putCat,
  )
  .delete(authenticateToken, deleteCat);

export default catRouter;
