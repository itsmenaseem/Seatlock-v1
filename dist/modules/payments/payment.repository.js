"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
exports.findPendingPaymentByOrder = findPendingPaymentByOrder;
const payment_status_1 = require("../../types/payment-status");
const payment_model_1 = require("./payment.model");
function createPayment(createPaymentData) {
    return payment_model_1.Payment.create(createPaymentData);
}
function findPendingPaymentByOrder(orderId, userId) {
    return payment_model_1.Payment.findOne({
        orderId,
        userId,
        status: { $in: [payment_status_1.PaymentStatus.INIT, payment_status_1.PaymentStatus.REQUIRES_PAYMENT] }
    });
}
//# sourceMappingURL=payment.repository.js.map