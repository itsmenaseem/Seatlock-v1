"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentCanceled = handlePaymentCanceled;
const order_model_1 = require("../modules/orders/order.model");
const payment_model_1 = require("../modules/payments/payment.model");
const order_status_1 = require("../types/order-status");
const payment_status_1 = require("../types/payment-status");
async function handlePaymentCanceled(event) {
    const pi = event.data.object;
    const payment = await payment_model_1.Payment.findOne({
        paymentIntentId: pi.id
    });
    if (!payment)
        return;
    const order = await order_model_1.Order.findById(payment.orderId);
    if (!order)
        return;
    payment.status = payment_status_1.PaymentStatus.CANCELLED;
    order.status = order_status_1.OrderStatus.CANCELLED;
    await payment.save();
    await order.save();
}
//# sourceMappingURL=payment-cancel.util.js.map