import Stripe from "stripe";

 class StripeClient {
  private _stripe: Stripe.Stripe | null = null;

  connect(secretKey: string) {
    this._stripe = new Stripe(secretKey, {
      apiVersion: "2026-03-25.dahlia",
    });
  }

  get client(): Stripe.Stripe {
    if (!this._stripe) {
      throw new Error("Stripe not configured");
    }
    return this._stripe;
  }
}

 const StripeWrapper = new StripeClient()
 export {StripeWrapper,Stripe}