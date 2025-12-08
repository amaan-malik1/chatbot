import { Router } from "express";
import { handleChat } from "../controller/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const route = Router();
route.post("/", protectRoute, handleChat);

export default route;
