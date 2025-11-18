import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import "dotenv/config";

const protect = async (req, res, next) => {
  // console.log("Starting the verification backend")
  let token;
  // 1. Check if the Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password").populate('folio_id', 'slug');
      console.log(req.user);
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "No user found with this token" });
      }

      // 5. If everything is successful, call next() to proceed to the route handler
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const sendRes = (req, res) => {
  return res.status(201).json({
    message: "User verified",
    data: req.user,
  });
};

export { protect, sendRes };
