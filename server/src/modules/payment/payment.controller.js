// payment.controller.js
import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const options = {
    amount: course.price * 100, // paisa
    currency: "INR",
    receipt: `course_${courseId}_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    success: true,
    order,
    course,
  });
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid payment signature" });
  }

  // ✅ Payment verified → enroll student
  await Enrollment.create({
    user: req.user.id,
    course: courseId,
    paymentId: razorpay_payment_id,
  });

  res.json({ success: true, message: "Payment verified & course unlocked" });
};

