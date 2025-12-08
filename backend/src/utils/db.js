import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(MONGO_URL.toString());
    console.log(`MongoDB connected at ${MONGO_URL}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};
