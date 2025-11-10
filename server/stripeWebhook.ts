import { Request, Response } from "express";
import { stripe } from "./stripe";
import * as db from "./db";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("No signature");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  console.log(`[Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        
        // Create donation record
        await db.createDonation({
          stripePaymentIntentId: session.payment_intent,
          amount: Math.round(session.amount_total / 100), // Convert from cents
          currency: session.currency,
          donorName: session.metadata?.donor_name || null,
          donorEmail: session.metadata?.donor_email || session.customer_email || null,
          message: session.metadata?.message || null,
          status: "completed",
        });

        console.log(`[Webhook] Donation recorded for payment intent: ${session.payment_intent}`);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as any;
        
        // Update donation status if it exists
        const existing = await db.getDonationByPaymentIntent(paymentIntent.id);
        if (existing) {
          await db.updateDonationStatus(paymentIntent.id, "completed");
          console.log(`[Webhook] Donation status updated to completed: ${paymentIntent.id}`);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as any;
        
        // Update donation status if it exists
        const existing = await db.getDonationByPaymentIntent(paymentIntent.id);
        if (existing) {
          await db.updateDonationStatus(paymentIntent.id, "failed");
          console.log(`[Webhook] Donation status updated to failed: ${paymentIntent.id}`);
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).send(`Webhook processing error: ${error.message}`);
  }
}
