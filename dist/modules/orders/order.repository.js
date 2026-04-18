"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.findValidOrderForCheckout = findValidOrderForCheckout;
const order_model_1 = require("./order.model");
const order_status_1 = require("../../types/order-status");
async function createOrder(data, session = null) {
    const order = new order_model_1.Order(data);
    await order.save({ session });
    return order;
}
function findValidOrderForCheckout(orderId, userId) {
    return order_model_1.Order.findOne({
        _id: orderId,
        userId,
        lockUntil: { $gt: new Date() },
        status: order_status_1.OrderStatus.CREATED,
        isPaid: false
    });
}
//# sourceMappingURL=order.repository.js.map