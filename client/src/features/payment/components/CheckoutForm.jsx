import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CardField from "./CardField";
import { enrollCourse } from "../services/enrollmentService";

export default function CheckoutForm({ clientSecret, courseId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handlePay = async () => {
  if (!stripe || !elements || !courseId) return;

  try {
    setLoading(true);
    setError(null);

    await enrollCourse(courseId);

    alert("Course enrolled successfully");
  } catch (err) {
    setError(
      err.response?.data?.message || "Enrollment failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-4">
      <CardField />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        {loading ? "Processing..." : "Pay & Enroll"}
      </button>
    </div>
  );
}
