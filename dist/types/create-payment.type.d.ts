import { PaymentStatus } from "./payment-status";
export interface CreatePayment {
    orderId: string;
    userId: string;
    paymentIntentId?: string;
    amount: number;
    currency: string;
    status?: PaymentStatus;
}
//# sourceMappingURL=create-payment.type.d.ts.map