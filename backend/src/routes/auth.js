import { Router } from "express";
import {signin, signup} from '../controller/authController.js';

const route = Router();

route.post('/signup', signup);
route.post('/login', signin);

export default route;
