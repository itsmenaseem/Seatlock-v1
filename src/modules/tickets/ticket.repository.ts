import { CreateTicket } from "../../types/create-ticket.type";
import { SeatStatus } from "../../types/seat-status.type";
import { Ticket, TicketDoc } from "./ticket.model";
import mongoose, { QueryFilter, UpdateQuery } from "mongoose";
export function findAndUpdateTicket(
  queryFilter: QueryFilter<TicketDoc>,
  updateQuery: UpdateQuery<TicketDoc>,
  session: mongoose.ClientSession|null
) {
  return Ticket.findOneAndUpdate(queryFilter, updateQuery, {
    new: true,
    runValidators: true,
    session
  });
}

export function createTickets(tickets:CreateTicket[],session:mongoose.ClientSession|null = null){
  return Ticket.insertMany(tickets,{session});
}

export function getTicketsByShow(showId: string) {
  const now = new Date();
  return Ticket.find({
    showId,
    $or: [
      { status: SeatStatus.AVAILABLE },
      { status: SeatStatus.LOCKED, lockUntil: { $lt: now } }
    ]
  });
}

