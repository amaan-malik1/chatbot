import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../model/user.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { phone, email, name, address } = req.body;

  try {
    if (!name || !phone) {
      return res.status(400).json({
        message: "Phone and name are required!",
      });
    }

    const existingUser = await userModel.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        message: "Already registered, use different phone num!",
      });
    }

    const checkUser = await userModel.create({
      phone,
      email,
      name,
      address,
    });

    const payload = {
      userId: checkUser._id,
      phone: checkUser.phone,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });

    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None", // for local dev it's okay; in prod also add secure: true
    });

    return res.status(201).json({
      message: "User signup successfully",
      token,
      checkUser,
    });
  } catch (error) {
    console.log("Error while signing up: ", error);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

export const signin = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.json({
        message: "Phone num is req!",
      });
    }

    const checkUser = await userModel.findOne({ phone });

    if (!checkUser) {
      return res.json({ needsRegistration: true });
    }

    const payload = {
      userId: checkUser._id,
      phone: checkUser.phone,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000, //its in milisec
      httpOnly: true, // prevent xss attacks
      sameSite: "None", // prevent csrf attacks
      secure: isProd,
    });

    res.status(201).json({
      message: "User login successfully",
      token,
      checkUser,
    });
  } catch (error) {
    console.log("Error while login: ", error);
    res.status(500).json({
      message: "Singin failed",
    });
  }
};
