import express from "express";
import { createPaymentIntent, confirmPayment } from "./payment.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-intent", protect, createPaymentIntent);
router.post("/confirm", protect, confirmPayment); // optional for testing / webhook

export default router;
