import  { model, Schema, Types } from "mongoose"
import { CreateTicket } from "../../types/create-ticket.type";
import { SeatStatus } from "../../types/seat-status.type";

export interface TicketDoc extends CreateTicket , Document {}

const ticketSchema = new Schema<TicketDoc>({
    amount:{
        type:Number,
        required:true,
        min:0
    },
    showId:{
        type:String
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: Object.values(SeatStatus),
        default: SeatStatus.AVAILABLE,
        select:false
    },
    lockUntil:{
        type:Date,
        select:false
    },
    lockedBy:{
        type:String,
        select:false
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

