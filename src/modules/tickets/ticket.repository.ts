import { SeatStatus } from "../../types/seat-status.type";
import { Ticket, TicketDoc } from "./ticket.model";
import { QueryFilter, UpdateQuery } from "mongoose";
export function findAndUpdateTicket(
  queryFilter: QueryFilter<TicketDoc>,
  updateQuery: UpdateQuery<TicketDoc>,
) {
  return Ticket.findOneAndUpdate(queryFilter, updateQuery, {
    new: true,
    runValidators: true,
  });
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

