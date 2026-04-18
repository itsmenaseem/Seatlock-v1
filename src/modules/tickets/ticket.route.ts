import {Router } from "express"
import { authMiddleware } from "../../middlewares/auth.middleware";
import { body, param } from "express-validator";
import { requestValidationMiddleware } from "../../middlewares/request-validaton.middleware";
import {createTicketsController, getTicketsByShowController, reserveTicketController, updateTicketAmountController} from "./ticket.controller";
const router = Router();

// create ticket
router.post("/",authMiddleware,[
  body("tickets")
    .notEmpty().withMessage("Tickets count is required")
    .bail()
    .isInt({gt:0}).withMessage("Tickets count must be a positive integer"),
    body("amount")
        .notEmpty().withMessage("Amount is required")
        .bail()
        .isFloat({gt:0}).withMessage("Amount must be a positive number"),
    body("showId")
        .notEmpty().withMessage("Show ID is required")
        .bail()
        .isMongoId().withMessage("Invalid showid")    
  ],requestValidationMiddleware,createTicketsController
)

// update ticket amount
router.patch("/:ticketId/amount",authMiddleware,[
     body("amount")
        .notEmpty().withMessage("Amount is required")
        .bail()
        .isFloat({gt:0}).withMessage("Amount must be a positive number"),
      param("ticketId")
        .isMongoId().withMessage("Invalid ticketId") 
],requestValidationMiddleware,updateTicketAmountController)

// // get all available tickets of an event
router.get("/show/:showId",[
     param("showId")
        .isMongoId().withMessage("Invalid showid")
],requestValidationMiddleware,getTicketsByShowController)

router.patch("/:ticketId/reserve",authMiddleware,reserveTicketController)


export {router as TicketRoutes}