"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentSuccess = handlePaymentSuccess;
const order_model_1 = require("../modules/orders/order.model");
const payment_model_1 = require("../modules/payments/payment.model");
const ticket_model_1 = require("../modules/tickets/ticket.model");
const order_status_1 = require("../types/order-status");
const payment_status_1 = require("../types/payment-status");
const seat_status_type_1 = require("../types/seat-status.type");
async function handlePaymentSuccess(event) {
    const pi = event.data.object;
    const payment = await payment_model_1.Payment.findOne({
        paymentIntentId: pi.id
    });
    if (!payment)
        return;
    if (payment.status === payment_status_1.PaymentStatus.COMPLETED)
        return;
    payment.status = payment_status_1.PaymentStatus.COMPLETED;
    const order = await order_model_1.Order.findOne({ _id: payment.orderId });
    if (!order)
        return;
    order.isPaid = true;
    if (order.lockUntil.getTime() < Date.now()) {
        order.status = order_status_1.OrderStatus.EXPIRED;
        await payment.save();
        await order.save();
        return;
    }
    const ticket = await ticket_model_1.Ticket.findById(order.ticketId);
    if (!ticket)
        return;
    if (ticket.status !== seat_status_type_1.SeatStatus.BOOKED) {
        ticket.status = seat_status_type_1.SeatStatus.BOOKED;
        order.status = order_status_1.OrderStatus.COMPLETED;
    }
    else {
        order.status = order_status_1.OrderStatus.EXPIRED;
    }
    await payment.save();
    await order.save();
    await ticket.save();
}
//# sourceMappingURL=payment-success.util.js.map