import { CreatePayment } from "../../types/create-payment.type";
import { PaymentStatus } from "../../types/payment-status";
import { Payment, PaymentDoc } from "./payment.model";

export function createPayment(createPaymentData: CreatePayment) {
    return Payment.create(createPaymentData);
}

export function findPendingPaymentByOrder(orderId: string, userId: string): Promise<PaymentDoc | null> {
    return Payment.findOne({
        orderId,
        userId,
        status: { $in: [PaymentStatus.INIT, PaymentStatus.REQUIRES_PAYMENT] }
    });
}