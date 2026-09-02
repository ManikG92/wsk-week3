import express from "express";
import api from "./api/index.js";

const app = express();

// Middleware for parsing JSON and urlencoded body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use("/public", express.static("public"));

// Base API route
app.use("/api/v1", api);

export default app;
