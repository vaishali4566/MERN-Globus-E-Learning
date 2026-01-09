import express from "express";
import {createSection} from "./section.controller.js"
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, allowedRoles("trainer"), createSection);

export default router;
