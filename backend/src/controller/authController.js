import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    // 1. Extract all required fields from the request body
    const { name, email, password, dob, address, phone } = req.body;
    // console.log(name , email , password, dob, address, phone)

    // 2. Validate that all required fields are present
    const requiredFields = { name, email, password, dob, address, phone };
    console.log(req.body);
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({
          success: false,
          message: `${key} is a required field.`,
        });
      }
    }

    // 3. Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        // 409 Conflict
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // 4. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the new user in the database
    const newUser = await User.create({
      ...req.body, // extra optional fields first
      name,
      email,
      password: hashedPassword,
      dob,
      address,
      phone,
    });

    // Exclude the password from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      // 201 Created
      success: true,
      message: "User registered successfully.",
      data: userResponse,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    // Set cookie and send response
    // const options = {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    // };

    return res
      .status(200)
      .cookie("accessToken", token)
      .json({
        success: true,
        message: "Logged in successfully.",
        data: { ...userResponse, token },
      });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const userResponse =  updatedUser.toObject();
    delete userResponse.password;
    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: userResponse,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export { registerUser, loginUser , updateUser};
