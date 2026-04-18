"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const request_validaton_middleware_1 = require("../../middlewares/request-validaton.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const order_controller_1 = require("./order.controller");
const order_model_1 = require("./order.model");
const order_status_1 = require("../../types/order-status");
const not_found_error_1 = require("../../errors/not-found.error");
const bad_request_error_1 = require("../../errors/bad-request.error");
const ticket_repository_1 = require("../tickets/ticket.repository");
const seat_status_type_1 = require("../../types/seat-status.type");
const transaction_util_1 = require("../../utils/transaction.util");
const router = (0, express_1.Router)();
exports.OrderRoutes = router;
router.post("/", [
    auth_middleware_1.authMiddleware,
    (0, express_validator_1.body)("ticketId")
        .notEmpty().withMessage("TicketId is required")
        .bail()
        .isMongoId().withMessage("Invalid TicketId"),
    (0, express_validator_1.body)("version")
        .notEmpty().withMessage("Version is required")
        .bail()
        .isInt({ min: 0 }).withMessage("Version must be a number"),
], request_validaton_middleware_1.requestValidationMiddleware, order_controller_1.createOrderController);
router.get("/my-orders", auth_middleware_1.authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const orders = await order_model_1.Order.find({ userId });
    const orderDetails = orders.map((order) => {
        if (order.isPaid && order.status === order_status_1.OrderStatus.EXPIRED) {
            return { ...order.toObject(), message: "Payment was successful but order has expired , do not worry we will refund you within 5-7 business days" };
        }
        if (order.isPaid && order.status === order_status_1.OrderStatus.CANCELLED) {
            return { ...order.toObject(), message: "Payment was successful but order has been cancelled , do not worry we will refund you within 5-7 business days" };
        }
        return order.toObject();
    });
    res.json(orderDetails);
});
router.patch("/cancel/:orderId", auth_middleware_1.authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    let isPaid = false;
    await (0, transaction_util_1.withMongoDBTransaction)(async (session) => {
        const order = await order_model_1.Order.findOne({ _id: orderId, userId }).session(session);
        if (!order)
            throw new not_found_error_1.NotFoundError("Order not found");
        const ticketId = order.ticketId;
        if (order.status !== order_status_1.OrderStatus.COMPLETED && order.status !== order_status_1.OrderStatus.CREATED) {
            throw new bad_request_error_1.BadRequestError("Only orders with status CREATED or COMPLETED can be cancelled");
        }
        await (0, ticket_repository_1.findAndUpdateTicket)({
            _id: ticketId,
            lockedBy: userId,
        }, {
            status: seat_status_type_1.SeatStatus.AVAILABLE,
            lockedBy: null,
            lockUntil: null
        }, session);
        order.status = order_status_1.OrderStatus.CANCELLED;
        await order.save({ session });
        if (order.isPaid) {
            isPaid = true;
        }
    });
    if (isPaid) {
        return res.json({ message: "Order cancelled successfully and you will receive a refund within 5-7 business days" });
    }
    res.json({ message: "Order cancelled successfully" });
});
//# sourceMappingURL=order.route.js.map