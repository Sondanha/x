import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// 회원가입하기
// http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.signup);

// 로그인하기
// http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);

export default router;
