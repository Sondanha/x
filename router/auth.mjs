import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middlehardware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력력")
    .matches(/^[a-xA-Z0-9]*$/)
    .withMessage("특수문자는 사용불가"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("최소 8자 이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식을 확인"),
  validate,
];

// 회원가입하기
// http://127.0.0.1:8080/auth/signup
router.post("/signup", validateSignup, authController.signup);

// 로그인하기
// http://127.0.0.1:8080/auth/login
router.post("/login", validateLogin, authController.login);

// 로그인 유지하기
// router.get("/", postController.maintainUsers);

export default router;
