"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderService = createOrderService;
exports.findValidOrderForCheckoutService = findValidOrderForCheckoutService;
const not_found_error_1 = require("../../errors/not-found.error");
const transaction_util_1 = require("../../utils/transaction.util");
const ticket_service_1 = require("../tickets/ticket.service");
const order_repository_1 = require("./order.repository");
async function createOrderService(ticketId, userId, version) {
    const order = await (0, transaction_util_1.withMongoDBTransaction)((async (session) => {
        const now = new Date();
        const LOCK_DURATION = 8 * 60 * 1000; // 8 min
        const lockUntil = now.getTime() + LOCK_DURATION;
        // reserve the ticket
        const reservedTicket = await (0, ticket_service_1.reserveTicketService)(ticketId, userId, version, lockUntil, session);
        if (!reservedTicket)
            throw new not_found_error_1.NotFoundError("Ticket may be updated or not available,please refresh and try again");
        // create order
        const orderData = {
            userId,
            ticketId,
            lockUntil: new Date(lockUntil),
            amount: reservedTicket.amount,
        };
        const order = await (0, order_repository_1.createOrder)(orderData, session);
        return order;
    }));
    return order;
}
async function findValidOrderForCheckoutService(orderId, userId) {
    const order = await (0, order_repository_1.findValidOrderForCheckout)(orderId, userId);
    if (!order)
        throw new not_found_error_1.NotFoundError("Order not found or you don't have access to this order or order may be expired");
    return order;
}
//# sourceMappingURL=order.service.js.map