import stripe from "../config/stripe.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Amount received:", amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // rupees → paise
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment intent failed" });
  }
};
