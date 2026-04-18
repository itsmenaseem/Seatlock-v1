"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const express_validator_1 = require("express-validator");
const request_validaton_middleware_1 = require("../../middlewares/request-validaton.middleware");
const ticket_controller_1 = require("./ticket.controller");
const router = (0, express_1.Router)();
exports.TicketRoutes = router;
// create ticket
router.post("/", auth_middleware_1.authMiddleware, [
    (0, express_validator_1.body)("tickets")
        .notEmpty().withMessage("Tickets count is required")
        .bail()
        .isInt({ gt: 0 }).withMessage("Tickets count must be a positive integer"),
    (0, express_validator_1.body)("amount")
        .notEmpty().withMessage("Amount is required")
        .bail()
        .isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
    (0, express_validator_1.body)("showId")
        .notEmpty().withMessage("Show ID is required")
        .bail()
        .isMongoId().withMessage("Invalid showid")
], request_validaton_middleware_1.requestValidationMiddleware, ticket_controller_1.createTicketsController);
// update ticket amount
router.patch("/:ticketId/amount", auth_middleware_1.authMiddleware, [
    (0, express_validator_1.body)("amount")
        .notEmpty().withMessage("Amount is required")
        .bail()
        .isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
    (0, express_validator_1.param)("ticketId")
        .isMongoId().withMessage("Invalid ticketId")
], request_validaton_middleware_1.requestValidationMiddleware, ticket_controller_1.updateTicketAmountController);
// // get all available tickets of an event
router.get("/show/:showId", [
    (0, express_validator_1.param)("showId")
        .isMongoId().withMessage("Invalid showid")
], request_validaton_middleware_1.requestValidationMiddleware, ticket_controller_1.getTicketsByShowController);
router.patch("/:ticketId/reserve", auth_middleware_1.authMiddleware, ticket_controller_1.reserveTicketController);
//# sourceMappingURL=ticket.route.js.map