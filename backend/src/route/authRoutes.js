import express from "express";
import { loginUser, registerUser } from "../controller/authController.js";
import { protect, sendRes } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/me", protect, sendRes);
// router.post('/logout',logoutUser);

export { router };
