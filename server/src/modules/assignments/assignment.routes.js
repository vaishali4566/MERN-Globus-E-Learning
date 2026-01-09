import express from "express";
import {createAssignment} from "./assignment.controller.js"
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, allowedRoles("trainer"), createAssignment);

export default router;
