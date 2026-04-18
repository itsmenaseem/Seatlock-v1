"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = require("mongoose");
const seat_status_type_1 = require("../../types/seat-status.type");
const ticketSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    showId: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(seat_status_type_1.SeatStatus),
        default: seat_status_type_1.SeatStatus.AVAILABLE,
        select: false
    },
    lockUntil: {
        type: Date,
        select: false
    },
    lockedBy: {
        type: String,
        select: false
    }
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
exports.Ticket = (0, mongoose_1.model)("ticket", ticketSchema);
//# sourceMappingURL=ticket.model.js.map