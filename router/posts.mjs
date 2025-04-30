import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middlehardware/validator.mjs";
import { isAuth } from "../middlehardware/auth.mjs";

const router = express.Router();

const validatePost = [
  body("text").trim().isLength({ min: 5 }).withMessage("최소 5자 이상 입력"),
  validate,
];

router.get("/", isAuth, postController.getPosts);
router.get("/:id", isAuth, postController.getPost);
router.post("/", validatePost, isAuth, postController.createPost);
router.put("/:id", validatePost, isAuth, postController.updatePost);
router.delete("/:id", isAuth, postController.deletePost);

export default router;
