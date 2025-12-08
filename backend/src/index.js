import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import dataRoute from "./routes/data.js";
import chatRoute from "./routes/chat.js";
import { connectDB } from "./utils/db.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/data", dataRoute);
app.use("/api/v1/chat", chatRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`server running success at ${PORT}`);
});
