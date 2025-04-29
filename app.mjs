console.log("🚀 process.env.PORT:");

import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "잘못된 요청입니다." });
});
app.listen(config.host.port);
