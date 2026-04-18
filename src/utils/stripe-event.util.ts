import { handlePaymentCanceled } from "./payment-cancel.util";
import { handlePaymentFailed } from "./payment-fail.util";
import { handlePaymentSuccess } from "./payment-success.util";

export async function handleStripeEvent(event: any) {
  switch (event.type) {
    case "payment_intent.succeeded":
      return await handlePaymentSuccess(event);

    case "payment_intent.payment_failed":
      return await handlePaymentFailed(event);

    case "payment_intent.canceled":
      return await handlePaymentCanceled(event);

    default:
      console.log("Unhandled event:", event.type);
  }
}