console.log("🚀 process.env.PORT:", process.env.PORT);

import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "main")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "main", "signup.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "잘못된 요청입니다." });
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
