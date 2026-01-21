import api from "@/services/api";

export const createPaymentIntent = (amount) =>
  api.post("/payments/create-intent", { amount });
