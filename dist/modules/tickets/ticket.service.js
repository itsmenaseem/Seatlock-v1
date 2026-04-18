"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicketService = createTicketService;
exports.updateTicketAmountService = updateTicketAmountService;
exports.getTicketsByShowService = getTicketsByShowService;
exports.reserveTicketService = reserveTicketService;
const not_found_error_1 = require("../../errors/not-found.error");
const seat_status_type_1 = require("../../types/seat-status.type");
const transaction_util_1 = require("../../utils/transaction.util");
const ticket_repository_1 = require("./ticket.repository");
async function createTicketService(data, count) {
    const tickets = Array.from({ length: count }).map(() => ({ ...data }));
    return await (0, transaction_util_1.withMongoDBTransaction)(async (session) => {
        return (0, ticket_repository_1.createTickets)(tickets, session);
    });
}
async function updateTicketAmountService(ticketId, amount, userId, session = null) {
    const queryFilter = { _id: ticketId, userId };
    const updateQuery = { amount };
    const updatedTicket = await (0, ticket_repository_1.findAndUpdateTicket)(queryFilter, updateQuery, session);
    if (!updatedTicket)
        throw new not_found_error_1.NotFoundError("Ticket not found");
    return updatedTicket;
}
function getTicketsByShowService(showId) {
    return (0, ticket_repository_1.getTicketsByShow)(showId);
}
async function reserveTicketService(ticketId, userId, version, now, session = null) {
    const filterQuery = {
        _id: ticketId, __v: version,
        $or: [
            { status: seat_status_type_1.SeatStatus.AVAILABLE },
            { status: seat_status_type_1.SeatStatus.LOCKED, lockUntil: { $lt: now } }
        ]
    };
    const updateQuery = {
        lockUntil: new Date(now),
        lockedBy: userId,
        status: seat_status_type_1.SeatStatus.LOCKED,
        $inc: { __v: 1 }
    };
    const ticket = await (0, ticket_repository_1.findAndUpdateTicket)(filterQuery, updateQuery, session);
    if (!ticket) {
        throw new not_found_error_1.NotFoundError("Ticket not available");
    }
    return ticket;
}
//# sourceMappingURL=ticket.service.js.map