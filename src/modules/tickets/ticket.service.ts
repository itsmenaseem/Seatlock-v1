
import mongoose from "mongoose";
import { NotFoundError } from "../../errors/not-found.error";
import { CreateTicket } from "../../types/create-ticket.type";
import { SeatStatus } from "../../types/seat-status.type";
import { withMongoDBTransaction } from "../../utils/transaction.util";
import { TicketDoc } from "./ticket.model";
import { createTickets, findAndUpdateTicket, getTicketsByShow } from "./ticket.repository";

export async function createTicketService(data: CreateTicket,count:number): Promise<TicketDoc []> { 
   const tickets = Array.from({length: count}).map(() => ({...data}))
   return  await withMongoDBTransaction<TicketDoc[]>(async(session)=>{
        return createTickets(tickets,session) ;
   })
}

export async function updateTicketAmountService(ticketId: string, amount: number,userId:string,session:mongoose.ClientSession|null = null): Promise<TicketDoc> {
    const queryFilter = { _id: ticketId, userId};
    const updateQuery = { amount};
    const updatedTicket = await findAndUpdateTicket(queryFilter,updateQuery,session);
    if(!updatedTicket)throw new NotFoundError("Ticket not found")
    return updatedTicket;
}

export function getTicketsByShowService(showId:string):Promise<TicketDoc[]>{
    return getTicketsByShow(showId);
}

export async function reserveTicketService(ticketId: string,userId: string,version:number,now:number,session:mongoose.ClientSession|null = null): Promise<TicketDoc> {

    const filterQuery = {
        _id: ticketId,__v:version,
        $or: [
            { status: SeatStatus.AVAILABLE },
            { status: SeatStatus.LOCKED, lockUntil: { $lt: now } }
        ]
    };

    const updateQuery = {
        lockUntil: new Date(now),
        lockedBy: userId,
        status: SeatStatus.LOCKED,
        $inc: { __v: 1 }
    };

    const ticket = await findAndUpdateTicket(filterQuery, updateQuery, session);

    if (!ticket) {
        throw new NotFoundError("Ticket not available");
    }

    return ticket;
}