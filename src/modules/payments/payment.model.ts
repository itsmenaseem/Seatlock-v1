import { Document, model, Schema } from "mongoose";
import { CreatePayment } from "../../types/create-payment.type";
import { PaymentStatus } from "../../types/payment-status";

export interface PaymentDoc extends CreatePayment,Document{};

const paymentSchema = new Schema<PaymentDoc>({
    paymentIntentId:{
        type:String,
        index:true
    },
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        enum:["INR"],
        default:"INR"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(PaymentStatus),
        default:PaymentStatus.INIT,
    }
},{
    timestamps:true,
    toJSON:{
        transform(doc,ret:any){
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
});

export const Payment = model<PaymentDoc>("payment",paymentSchema);