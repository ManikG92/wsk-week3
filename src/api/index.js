import express from "express";
import catRouter from "./routes/cat-router.js";
import userRouter from "./routes/user-router.js";
import authRouter from "./routes/auth-router.js";

const apiRouter = express.Router();

apiRouter.use("/cats", catRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
