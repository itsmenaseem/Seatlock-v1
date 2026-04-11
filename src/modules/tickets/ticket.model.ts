import  { model, Schema, Types } from "mongoose"
import { CreateTicket } from "../../types/create-ticket.type";

export interface TicketDoc extends CreateTicket , Document {}

const ticketSchema = new Schema<TicketDoc>({
    amount:{
        type:Number,
        required:true,
        min:0
    },
    eventId:{
        type:String
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    toJSON:{
        transform(doc,ret:any){
            ret.id = ret._id
            delete ret._id
            return ret
        }
    }
});

export const Ticket = model<TicketDoc>("ticket",ticketSchema);

