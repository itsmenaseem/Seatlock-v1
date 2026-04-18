import mongoose from "mongoose";
import { CreateTicket } from "../../types/create-ticket.type";
import { TicketDoc } from "./ticket.model";
export declare function createTicketService(data: CreateTicket, count: number): Promise<TicketDoc[]>;
export declare function updateTicketAmountService(ticketId: string, amount: number, userId: string, session?: mongoose.ClientSession | null): Promise<TicketDoc>;
export declare function getTicketsByShowService(showId: string): Promise<TicketDoc[]>;
export declare function reserveTicketService(ticketId: string, userId: string, version: number, now: number, session?: mongoose.ClientSession | null): Promise<TicketDoc>;
//# sourceMappingURL=ticket.service.d.ts.map