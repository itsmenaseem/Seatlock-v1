"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentController = createPaymentController;
const payment_service_1 = require("./payment.service");
async function createPaymentController(req, res) {
    const { orderId } = req.body;
    const userId = req.user.id;
    const data = await (0, payment_service_1.createPaymentService)(orderId, userId);
    res.status(201).json(data);
}
//# sourceMappingURL=payment.controller.js.map