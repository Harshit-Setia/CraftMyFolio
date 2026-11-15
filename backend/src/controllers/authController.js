import { User } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudUpload.js";
import { saveUserAndRespond } from "../utils/controllerUtils.js";
import { Folio } from "../models/folioModel.js";
import redisClient from "../config/redisClient.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dob, address, phone } = req.body;

  const requiredFields = { name, email, password, dob, address, phone };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({
        success: false,
        message: `${key} is a required field.`,
      });
    }
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "A user with this email already exists.",
    });
  }
  const avatarLocalPath = req.file?.path;
  console.log("Avatar local Path ", avatarLocalPath);
  let avatar = undefined;
  if (!avatarLocalPath) {
    avatar = "";
  } else {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Succesful upload of Avatar ", avatar);
    if (avatar == undefined) {
      return res.status(500).json({ message: "Cloudinary error" });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    name,
    email,
    password: hashedPassword,
    dob,
    address,
    phone,
    avatar,
  });

  const userResponse = newUser.toObject();
  delete userResponse.password;

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: userResponse,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userResponse = user.toObject();
  delete userResponse.password;


  return res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: { ...userResponse, token },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }


  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  user.dob = req.body.dob || user.dob;
  user.bio = req.body.bio || user.bio;
  if (req.file) {
    const avatarLocalPath = req.file.path;
    const cloudinaryResponse = await uploadOnCloudinary(avatarLocalPath);
    if (!cloudinaryResponse) {
      return res
        .status(500)
        .json({ message: "Error uploading new avatar to Cloudinary" });
    }
    user.avatar = cloudinaryResponse.url;
  }
  user.resume = req.body.resume || user.resume;

  if (req.body.education) {
    user.education = req.body.education;
  }
  if (req.body.experience) {
    user.experience = req.body.experience;
  }
  if (req.body.projects) {
    user.projects = req.body.projects;
  }
  if (req.body.skills) {
    user.skills = req.body.skills;
  }
  if (req.body.social) {
    user.social = req.body.social;
  }
  if (req.body.testimonials) {
    user.testimonials = req.body.testimonials;
  }


  const updatedUser = await user.save();

  try {
    const folio = await Folio.findOne({ user_id: user._id });

    if (folio) {
      const cacheKey = `folio:${folio.slug}`;
      await redisClient.del(cacheKey);
    }
    console.log("redis deleted");
  } catch (err) {
    console.error("Redis Error:", err);
  }
  res.status(200).json({
    data: updatedUser,
  });
});

export const updateUserAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided.");
  }

  const imageUrl = await uploadOnCloudinary(req.file?.path);

  user.avatar = imageUrl;

  const folio = await Folio.findOne({ user_id: user._id });
  if (folio) {
    const cacheKey = `folio:${folio.slug}`;
    await redisClient.del(cacheKey);
  }

  await saveUserAndRespond(user, res);
});

export const getMe = (req, res) => {
  return res.status(200).json({
    message: "User verified",
    data: req.user,
  });
};
