"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const payment_status_1 = require("../../types/payment-status");
;
const paymentSchema = new mongoose_1.Schema({
    paymentIntentId: {
        type: String,
        index: true
    },
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        enum: ["INR"],
        default: "INR"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(payment_status_1.PaymentStatus),
        default: payment_status_1.PaymentStatus.INIT,
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
exports.Payment = (0, mongoose_1.model)("payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map