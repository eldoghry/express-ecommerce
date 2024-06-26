import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnect from "./config/db";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import {
  errorHandler,
  urlNotFound,
} from "./middlewares/error-handler.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("short"));

dbConnect();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

// error handler middleware
app.all("*", urlNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
