"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdateTicket = findAndUpdateTicket;
exports.createTickets = createTickets;
exports.getTicketsByShow = getTicketsByShow;
const seat_status_type_1 = require("../../types/seat-status.type");
const ticket_model_1 = require("./ticket.model");
function findAndUpdateTicket(queryFilter, updateQuery, session) {
    return ticket_model_1.Ticket.findOneAndUpdate(queryFilter, updateQuery, {
        new: true,
        runValidators: true,
        session
    });
}
function createTickets(tickets, session = null) {
    return ticket_model_1.Ticket.insertMany(tickets, { session });
}
function getTicketsByShow(showId) {
    const now = new Date();
    return ticket_model_1.Ticket.find({
        showId,
        $or: [
            { status: seat_status_type_1.SeatStatus.AVAILABLE },
            { status: seat_status_type_1.SeatStatus.LOCKED, lockUntil: { $lt: now } }
        ]
    });
}
//# sourceMappingURL=ticket.repository.js.map