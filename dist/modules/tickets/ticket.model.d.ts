import { Types } from "mongoose";
import { CreateTicket } from "../../types/create-ticket.type";
export interface TicketDoc extends CreateTicket, Document {
}
export declare const Ticket: import("mongoose").Model<TicketDoc, {}, {}, {}, import("mongoose").Document<unknown, {}, TicketDoc, {}, import("mongoose").DefaultSchemaOptions> & TicketDoc & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TicketDoc>;
//# sourceMappingURL=ticket.model.d.ts.map