"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = createOrderController;
const order_service_1 = require("./order.service");
async function createOrderController(req, res) {
    const { ticketId, version } = req.body;
    const userId = req.user.id;
    const order = await (0, order_service_1.createOrderService)(ticketId, userId, version);
    res.status(201).json(order);
}
//# sourceMappingURL=order.controller.js.map