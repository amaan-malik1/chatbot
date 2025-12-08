import jwt from "jsonwebtoken";
import { userModel } from "../model/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or token expired",
      });
    }

    const userPresent = await userModel.findById(decoded.userId);
    if (!userPresent) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    req.user = userPresent;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    res.status(401).json({
      message: "Internal server error",
    });
  }
};
