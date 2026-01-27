import stripe from "../../config/stripe.js";
import Payment from "./payment.model.js";
import { AppError } from "../../utils/appError.js";

// Create Stripe PaymentIntent
export const createPaymentIntentService = async ({ studentId, courseId, amount }) => {
  if (!studentId || !courseId || !amount) {
    throw new AppError("Missing required payment info", 400);
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe uses smallest currency unit (paise)
    currency: "inr",
    metadata: {
      studentId,
      courseId,
    },
  });

  // Save payment record in DB
  const payment = await Payment.create({
    student: studentId,
    course: courseId,
    paymentIntentId: paymentIntent.id,
    amount,
    status: "pending",
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment._id,
  };
};

// Update payment status after confirmation
import Enrollment from "../enrollments/enrollment.model.js";

export const updatePaymentStatusService = async (
  paymentIntentId,
  status
) => {
  const payment = await Payment.findOne({ paymentIntentId });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  // Prevent duplicate processing
  if (payment.status === "success") {
    return payment;
  }

  payment.status = status;
  await payment.save();

  // ✅ ONLY ON SUCCESS → CREATE ENROLLMENT
  if (status === "success") {
    await Enrollment.create({
      student: payment.student,
      course: payment.course,
      payment: payment._id,
    });
  }

  return payment;
};

