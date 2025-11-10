import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

export async function createCheckoutSession(params: {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Don à ASBL Hope Action Jeunesse",
            description: params.message || "Soutien à notre action contre le harcèlement",
          },
          unit_amount: params.amount * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.donorEmail,
    metadata: {
      donor_name: params.donorName || "",
      donor_email: params.donorEmail || "",
      message: params.message || "",
    },
    allow_promotion_codes: true,
  });

  return session;
}
