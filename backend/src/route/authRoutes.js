import express from "express";
import { loginUser, registerUser,updateUser,updateUserAvatar } from "../controller/authController.js";
import { protect, sendRes } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";


const router = express.Router();

router.post("/signup",upload.single("avatar") ,registerUser);
router.post("/signin", loginUser);
router.get("/me", protect, sendRes);
// router.post('/logout',logoutUser);
router.patch("/me",protect, upload.single("avatar") ,updateUser);
router.patch('/me/avatar', protect, upload.single('avatar'), updateUserAvatar);

export { router };
