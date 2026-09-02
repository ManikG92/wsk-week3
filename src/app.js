import express from "express";
import cors from "cors";
import apiRouter from "./api/index.js";

const app = express();

app.use(cors()); // Fixes CORS for frontend testing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.use("/api/v1", apiRouter);

export default app;
