import express from "express";
import { loginUser, registerUser } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
// router.post('/logout',logoutUser);

export { router };
