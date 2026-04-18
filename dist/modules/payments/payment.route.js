"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const request_validaton_middleware_1 = require("../../middlewares/request-validaton.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const payment_controller_1 = require("./payment.controller");
const payment_model_1 = require("./payment.model");
const router = (0, express_1.Router)();
exports.PaymentRoutes = router;
router.post("/checkout", auth_middleware_1.authMiddleware, [
    (0, express_validator_1.body)("orderId")
        .notEmpty().withMessage("orderId is required")
        .isMongoId().withMessage("Invalid orderId"),
], request_validaton_middleware_1.requestValidationMiddleware, payment_controller_1.createPaymentController);
router.get("/verify/:paymentId", auth_middleware_1.authMiddleware, [
    (0, express_validator_1.param)("paymentId")
        .notEmpty().withMessage("PaymentId is required")
        .bail()
        .isMongoId().withMessage("Invalid paymentId")
], request_validaton_middleware_1.requestValidationMiddleware, async (req, res) => {
    const { paymentId } = req.params;
    const userId = req.user.id;
    const payment = await payment_model_1.Payment.findOne({ _id: paymentId, userId });
    return res.json({ payment });
});
//# sourceMappingURL=payment.route.js.map