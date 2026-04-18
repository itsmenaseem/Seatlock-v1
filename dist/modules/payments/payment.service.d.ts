import { PaymentStatus } from "../../types/payment-status";
export declare function createPaymentService(orderId: string, userId: string): Promise<{
    clientSecret: string | null;
    paymentId: string;
    paymentIntentId: string;
    amount: number;
    currency: string;
    status: PaymentStatus.REQUIRES_PAYMENT;
}>;
//# sourceMappingURL=payment.service.d.ts.map