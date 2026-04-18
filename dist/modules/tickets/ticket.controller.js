"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicketsController = createTicketsController;
exports.updateTicketAmountController = updateTicketAmountController;
exports.getTicketsByShowController = getTicketsByShowController;
exports.reserveTicketController = reserveTicketController;
const show_service_1 = require("../shows/show.service");
const ticket_service_1 = require("./ticket.service");
async function createTicketsController(req, res) {
    const { tickets, amount, showId } = req.body;
    const userId = req.user.id;
    await (0, show_service_1.getShowByIdService)(showId, userId);
    const ticket = await (0, ticket_service_1.createTicketService)({ amount, userId, showId }, tickets);
    res.status(201).json(ticket);
}
async function updateTicketAmountController(req, res) {
    const { amount } = req.body;
    const { ticketId } = req.params;
    const userId = req.user.id;
    const updatedTicket = await (0, ticket_service_1.updateTicketAmountService)(ticketId, amount, userId);
    res.status(200).json({ updatedTicket });
}
async function getTicketsByShowController(req, res) {
    const { showId } = req.params;
    const tickets = await (0, ticket_service_1.getTicketsByShowService)(showId);
    res.status(200).json({ tickets });
}
async function reserveTicketController(req, res) {
    const { ticketId } = req.params;
    const version = Number(req.body.version);
    const userId = req.user.id;
    const lockUntil = Date.now() + 8 * 60 * 1000;
    const ticket = await (0, ticket_service_1.reserveTicketService)(ticketId, userId, version, lockUntil);
    res.status(200).json({ ticket });
}
//# sourceMappingURL=ticket.controller.js.map