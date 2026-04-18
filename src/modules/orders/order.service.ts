import { BadRequestError } from "../../errors/bad-request.error";
import { NotFoundError } from "../../errors/not-found.error";
import { CreateOrder } from "../../types/create-order.type";
import { withMongoDBTransaction } from "../../utils/transaction.util";
import { reserveTicketService } from "../tickets/ticket.service";
import { OrderDoc } from "./order.model";
import { createOrder, findValidOrderForCheckout } from "./order.repository";


export async function createOrderService(ticketId: string, userId: string, version:number):Promise<OrderDoc>{
    
  const order =  await withMongoDBTransaction((async(session)=>{
        const now = new Date();
        const LOCK_DURATION = 8 * 60 * 1000; // 8 min
        const lockUntil = now.getTime() + LOCK_DURATION;
        // reserve the ticket
        const reservedTicket = await reserveTicketService(ticketId,userId,version,lockUntil,session);
        if(!reservedTicket) throw new NotFoundError("Ticket may be updated or not available,please refresh and try again");
        // create order
        const orderData:CreateOrder = {
            userId,
            ticketId,
            lockUntil:new Date(lockUntil),
            amount:reservedTicket.amount,
        }
        const order = await createOrder(orderData,session);
        return order
    }));
   return order;
}


export async function findValidOrderForCheckoutService(orderId:string,userId:string):Promise<OrderDoc>{
    const order = await findValidOrderForCheckout(orderId,userId);
    if(!order) throw new NotFoundError("Order not found or you don't have access to this order or order may be expired");
    return order;
}


