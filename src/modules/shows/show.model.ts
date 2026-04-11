import  { model, Schema, Types } from "mongoose";
import { CreateShow } from "../../types/create-event.type";

export interface ShowDoc extends CreateShow , Document {}

const showSchema = new Schema<ShowDoc>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true,
        ref:"user"
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

export const Show = model<ShowDoc>("show",showSchema);

