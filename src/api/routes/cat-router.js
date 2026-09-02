import express from "express";
import multer from "multer";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";
import { createThumbnail } from "../../middlewares/upload.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const upload = multer({ dest: "uploads/" });
const catRouter = express.Router();

catRouter
  .route("/")
  .get(getCat)
  .post(authenticateToken, upload.single("cat"), createThumbnail, postCat);

catRouter
  .route("/:id")
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;
