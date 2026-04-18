"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeEvent = handleStripeEvent;
const payment_cancel_util_1 = require("./payment-cancel.util");
const payment_fail_util_1 = require("./payment-fail.util");
const payment_success_util_1 = require("./payment-success.util");
async function handleStripeEvent(event) {
    switch (event.type) {
        case "payment_intent.succeeded":
            return await (0, payment_success_util_1.handlePaymentSuccess)(event);
        case "payment_intent.payment_failed":
            return await (0, payment_fail_util_1.handlePaymentFailed)(event);
        case "payment_intent.canceled":
            return await (0, payment_cancel_util_1.handlePaymentCanceled)(event);
        default:
            console.log("Unhandled event:", event.type);
    }
}
//# sourceMappingURL=stripe-event.util.js.map