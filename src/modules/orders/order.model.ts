
import { model ,Schema } from "mongoose";
import { CreateOrder } from "../../types/create-order.type";
import { Document } from "mongoose";
import { OrderStatus } from "../../types/order-status";
import { PaymentStatus } from "../../types/payment-status";

export interface OrderDoc extends CreateOrder,Document {}

const orderSchema = new Schema<OrderDoc>({
    userId:{
        type:String,
        required:true
    },
    ticketId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(OrderStatus),
        default:OrderStatus.CREATED
    },
    isPaid:{
        type:Boolean,
        default:false

    },
    lockUntil:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
},{
    timestamps:true,
    toJSON:{
        transform(doc,ret:any){
            ret.id = ret._id;
            ret.version = ret.__v;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});


export const Order =  model<OrderDoc>("orders",orderSchema);