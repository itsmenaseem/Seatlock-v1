import Stripe from "stripe";
declare class StripeClient {
    private _stripe;
    connect(secretKey: string): void;
    get client(): Stripe.Stripe;
}
declare const StripeWrapper: StripeClient;
export { StripeWrapper, Stripe };
//# sourceMappingURL=stripe.wrapper.d.ts.map