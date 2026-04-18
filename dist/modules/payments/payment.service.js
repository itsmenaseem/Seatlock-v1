"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentService = createPaymentService;
const payment_status_1 = require("../../types/payment-status");
const stripe_wrapper_1 = require("../../wrappers/stripe.wrapper");
const order_service_1 = require("../orders/order.service");
const payment_repository_1 = require("./payment.repository");
async function createPaymentService(orderId, userId) {
    const order = await (0, order_service_1.findValidOrderForCheckoutService)(orderId, userId);
    const existingPayment = await (0, payment_repository_1.findPendingPaymentByOrder)(order._id.toString(), userId);
    // create payment record when one does not already exist for the same order
    const paymentRecord = existingPayment ?? await (0, payment_repository_1.createPayment)({
        orderId: order._id.toString(),
        userId: order.userId,
        amount: order.amount,
        currency: "INR",
        status: payment_status_1.PaymentStatus.INIT
    });
    // create payment intent with stripe
    const paymentIntent = await stripe_wrapper_1.StripeWrapper.client.paymentIntents.create({
        amount: Math.round(order.amount * 100), // convert to smallest currency unit
        currency: paymentRecord.currency,
        metadata: {
            orderId: order._id.toString(),
            userId: order.userId,
            paymentId: paymentRecord._id.toString()
        }
    }, {
        idempotencyKey: order._id.toString() // to avoid creating multiple payment intents for same order
    });
    paymentRecord.paymentIntentId = paymentIntent.id;
    paymentRecord.status = payment_status_1.PaymentStatus.REQUIRES_PAYMENT;
    await paymentRecord.save();
    return {
        clientSecret: paymentIntent.client_secret,
        paymentId: paymentRecord._id.toString(),
        paymentIntentId: paymentIntent.id,
        amount: paymentRecord.amount,
        currency: paymentRecord.currency,
        status: paymentRecord.status,
    };
}
//# sourceMappingURL=payment.service.js.map