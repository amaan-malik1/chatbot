import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getDeals,
  getOrder,
  getPayments,
} from "../controller/dataController.js";

const route = Router();

route.get("/deals", protectRoute, getDeals);
route.get("/orders", protectRoute, getOrder);
route.get("/payments", protectRoute, getPayments);
export default route;
