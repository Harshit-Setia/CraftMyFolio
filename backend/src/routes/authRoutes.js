import express from "express";
import { loginUser, registerUser, updateUser, updateUserAvatar, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();

router.post("/signup", upload.single("avatar"), registerUser);
router.post("/signin", loginUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, upload.single("avatar"), updateUser);
router.patch('/me/avatar', protect, upload.single('avatar'), updateUserAvatar);

export { router };
