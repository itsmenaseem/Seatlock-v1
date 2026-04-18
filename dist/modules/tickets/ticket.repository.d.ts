import { CreateTicket } from "../../types/create-ticket.type";
import { TicketDoc } from "./ticket.model";
import mongoose, { QueryFilter, UpdateQuery } from "mongoose";
export declare function findAndUpdateTicket(queryFilter: QueryFilter<TicketDoc>, updateQuery: UpdateQuery<TicketDoc>, session: mongoose.ClientSession | null): mongoose.Query<(mongoose.Document<unknown, {}, TicketDoc, {}, mongoose.DefaultSchemaOptions> & TicketDoc & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null, mongoose.Document<unknown, {}, TicketDoc, {}, mongoose.DefaultSchemaOptions> & TicketDoc & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, TicketDoc, "findOneAndUpdate", {}>;
export declare function createTickets(tickets: CreateTicket[], session?: mongoose.ClientSession | null): Promise<(Omit<mongoose.Document<unknown, {}, TicketDoc, {}, mongoose.DefaultSchemaOptions> & TicketDoc & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, keyof CreateTicket[]> & Omit<CreateTicket[], "_id">)[]>;
export declare function getTicketsByShow(showId: string): mongoose.Query<(mongoose.Document<unknown, {}, TicketDoc, {}, mongoose.DefaultSchemaOptions> & TicketDoc & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[], mongoose.Document<unknown, {}, TicketDoc, {}, mongoose.DefaultSchemaOptions> & TicketDoc & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, TicketDoc, "find", {}>;
//# sourceMappingURL=ticket.repository.d.ts.map