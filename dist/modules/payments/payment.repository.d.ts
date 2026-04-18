import { CreatePayment } from "../../types/create-payment.type";
import { PaymentDoc } from "./payment.model";
export declare function createPayment(createPaymentData: CreatePayment): Promise<import("mongoose").Document<unknown, {}, PaymentDoc, {}, import("mongoose").DefaultSchemaOptions> & PaymentDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare function findPendingPaymentByOrder(orderId: string, userId: string): Promise<PaymentDoc | null>;
//# sourceMappingURL=payment.repository.d.ts.map