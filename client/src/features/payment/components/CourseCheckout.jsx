import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/config/stripe";
import CheckoutForm from "./CheckoutForm";

export default function CourseCheckout({ course }) {
  if (!course) {
    return <div>Loading course...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold">{course.title}</h2>
        <p className="text-sm">Amount: ₹{course.price}</p>

        <CheckoutForm courseId={course._id} />
      </div>
    </Elements>
  );
}

