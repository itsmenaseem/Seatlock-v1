"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_status_1 = require("../../types/order-status");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    ticketId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(order_status_1.OrderStatus),
        default: order_status_1.OrderStatus.CREATED
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    lockUntil: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            ret.version = ret.__v;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
exports.Order = (0, mongoose_1.model)("orders", orderSchema);
//# sourceMappingURL=order.model.js.map