import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/config/stripe";
import CheckoutForm from "./CheckoutForm";
import { createPaymentIntent } from "../services/paymentService";

export default function CourseCheckout({ course }) {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!course?._id) return;

    const fetchClientSecret = async () => {
      try {
        const res = await createPaymentIntent(course._id, course.price);
        console.log("PAYMENT INTENT RESPONSE 👉", res.data);
        setClientSecret(res.data.data.clientSecret);
      } catch (err) {
        console.error("PaymentIntent fetch failed", err);
      }
    };

    fetchClientSecret();
  }, [course]);

  if (!course) return <div>Loading course...</div>;
  if (!clientSecret) return <div>Preparing payment...</div>; // only show this until clientSecret ready

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }} key={clientSecret}>
      <CheckoutForm courseId={course._id} clientSecret={clientSecret} />
    </Elements>
  );
}
