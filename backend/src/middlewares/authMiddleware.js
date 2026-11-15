import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import "dotenv/config";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password").populate('folio_id', 'slug template_id');
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "No user found with this token" });
      }

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



export { protect };
