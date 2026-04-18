import { Document } from "mongoose";
import { CreatePayment } from "../../types/create-payment.type";
export interface PaymentDoc extends CreatePayment, Document {
}
export declare const Payment: import("mongoose").Model<PaymentDoc, {}, {}, {}, Document<unknown, {}, PaymentDoc, {}, import("mongoose").DefaultSchemaOptions> & PaymentDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, PaymentDoc>;
//# sourceMappingURL=payment.model.d.ts.map