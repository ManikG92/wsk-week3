import express from "express";
import cors from "cors";
import apiRouter from "./api/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/error-handlers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.use("/api/v1", apiRouter);

// Error handlers must be mounted last
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
