
import { NotFoundError } from "../../errors/not-found.error";
import { CreateTicket } from "../../types/create-ticket.type";
import { SeatStatus } from "../../types/seat-status.type";
import { Ticket, TicketDoc } from "./ticket.model";
import { findAndUpdateTicket, getTicketsByShow } from "./ticket.repository";

export function createTicketService(data: CreateTicket): Promise<TicketDoc> {
    return Ticket.create({
        ...data
    })
}

export async function updateTicketAmountService(ticketId: string, amount: number,userId:string): Promise<TicketDoc> {
    const queryFilter = { _id: ticketId, userId};
    const updateQuery = { amount};
    const updatedTicket = await findAndUpdateTicket(queryFilter,updateQuery);
    if(!updatedTicket)throw new NotFoundError("Ticket not found")
    return updatedTicket;
}

export function getTicketsByShowService(showId:string):Promise<TicketDoc[]>{
    return getTicketsByShow(showId);
}

export async function reserveTicketService(ticketId: string,userId: string) {
    const now = new Date();
    const LOCK_DURATION = 15 * 60 * 1000;

    const filterQuery = {
        _id: ticketId,
        $or: [
            { status: SeatStatus.AVAILABLE },
            { status: SeatStatus.LOCKED, lockUntil: { $lt: now } }
        ]
    };

    const updateQuery = {
        lockUntil: new Date(now.getTime() + LOCK_DURATION),
        lockedBy: userId,
        status: SeatStatus.LOCKED
    };

    const ticket = await findAndUpdateTicket(filterQuery, updateQuery);

    if (!ticket) {
        throw new NotFoundError("Ticket not available");
    }

    return ticket;
}