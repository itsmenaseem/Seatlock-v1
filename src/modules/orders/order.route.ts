import { Router } from "express";
import { body } from "express-validator";
import { requestValidationMiddleware } from "../../middlewares/request-validaton.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createOrderController } from "./order.controller";
import { Order } from "./order.model";
import { OrderStatus } from "../../types/order-status";
import { NotFoundError } from "../../errors/not-found.error";
import { BadRequestError } from "../../errors/bad-request.error";
import { findAndUpdateTicket } from "../tickets/ticket.repository";
import { SeatStatus } from "../../types/seat-status.type";
import { withMongoDBTransaction } from "../../utils/transaction.util";

const router = Router();

router.post("/",[
    authMiddleware,
    body("ticketId")
        .notEmpty().withMessage("TicketId is required")
        .bail()
        .isMongoId().withMessage("Invalid TicketId"),
    body("version")
        .notEmpty().withMessage("Version is required")
        .bail()
        .isInt({min:0}).withMessage("Version must be a number"),
],requestValidationMiddleware,createOrderController);


router.get("/my-orders",authMiddleware,async (req,res)=>{
    const userId = req.user!.id;
    const orders = await Order.find({userId});
    const orderDetails = orders.map((order)=>{
        if(order.isPaid && order.status === OrderStatus.EXPIRED){
            return {...order.toObject(),message:"Payment was successful but order has expired , do not worry we will refund you within 5-7 business days"};
        }
        if(order.isPaid && order.status === OrderStatus.CANCELLED){
            return {...order.toObject(),message:"Payment was successful but order has been cancelled , do not worry we will refund you within 5-7 business days"};
        }
        return order.toObject();
    });
    res.json(orderDetails);
})


router.patch("/cancel/:orderId",authMiddleware,async (req,res)=>{
    const {orderId} = req.params;
    const userId = req.user!.id;
    let isPaid = false;
    await withMongoDBTransaction(async(session)=>{
        const order = await Order.findOne({_id:orderId!,userId}).session(session);
        if(!order)throw new NotFoundError("Order not found");
        const ticketId = order.ticketId;
        if(order.status !== OrderStatus.COMPLETED && order.status !== OrderStatus.CREATED){
            throw new BadRequestError("Only orders with status CREATED or COMPLETED can be cancelled");
        }
        await findAndUpdateTicket({
            _id: ticketId,
            lockedBy: userId,
        },{
            status:SeatStatus.AVAILABLE,
            lockedBy:null,
            lockUntil:null
        },session);
        order.status = OrderStatus.CANCELLED;
        await order.save({session});
        if(order.isPaid){
            isPaid = true;
        }
    })
    if(isPaid){
            return res.json({message:"Order cancelled successfully and you will receive a refund within 5-7 business days"});
    }
    res.json({message:"Order cancelled successfully"});
})

export {router as OrderRoutes}