
import { PaymentStatus } from "../../types/payment-status";
import { StripeWrapper } from "../../wrappers/stripe.wrapper";
import { findValidOrderForCheckoutService } from "../orders/order.service";
import { createPayment, findPendingPaymentByOrder } from "./payment.repository";

export async function createPaymentService(orderId:string, userId:string){
    const order = await findValidOrderForCheckoutService(orderId,userId);
    const existingPayment = await findPendingPaymentByOrder(order._id.toString(), userId);
    // create payment record when one does not already exist for the same order
    const paymentRecord = existingPayment ?? await createPayment({
        orderId:order._id.toString(),
        userId:order.userId,
        amount:order.amount,
        currency:"INR",
        status: PaymentStatus.INIT
    });

    // create payment intent with stripe
    const paymentIntent = await StripeWrapper.client.paymentIntents.create({
        amount: Math.round(order.amount * 100), // convert to smallest currency unit
        currency:paymentRecord.currency,
        metadata:{
            orderId:order._id.toString(),
            userId:order.userId,
            paymentId: paymentRecord._id.toString()
        }

    },{
        idempotencyKey:order._id.toString() // to avoid creating multiple payment intents for same order
    })
    paymentRecord.paymentIntentId = paymentIntent.id;
    paymentRecord.status = PaymentStatus.REQUIRES_PAYMENT;
    await paymentRecord.save();

    return {
        clientSecret: paymentIntent.client_secret,
        paymentId: paymentRecord._id.toString(),
        paymentIntentId: paymentIntent.id,
        amount: paymentRecord.amount,
        currency: paymentRecord.currency,
        status: paymentRecord.status,
    };
}
