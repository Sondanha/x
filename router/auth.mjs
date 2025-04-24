import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.signup);

// http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);

// http://127.0.0.1:8080/auth/logout
router.get("/logout", authController.logout);

// http://127.0.0.1:8080/auth/me
router.get("/me", authController.me);

export default router;
