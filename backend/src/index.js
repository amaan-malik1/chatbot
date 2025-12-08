import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import dataRoute from "./routes/data.js";
import chatRoute from "./routes/chat.js";
import { connectDB } from "./utils/db.js";

dotenv.config();
const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/data", dataRoute);
app.use("/api/v1/chat", chatRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`server running success at ${PORT}`);
});
