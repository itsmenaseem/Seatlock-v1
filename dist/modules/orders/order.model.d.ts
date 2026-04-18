import { CreateOrder } from "../../types/create-order.type";
import { Document } from "mongoose";
export interface OrderDoc extends CreateOrder, Document {
}
export declare const Order: import("mongoose").Model<OrderDoc, {}, {}, {}, Document<unknown, {}, OrderDoc, {}, import("mongoose").DefaultSchemaOptions> & OrderDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, OrderDoc>;
//# sourceMappingURL=order.model.d.ts.map