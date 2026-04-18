import { Order } from "../modules/orders/order.model";
import { Payment } from "../modules/payments/payment.model";
import { OrderStatus } from "../types/order-status";
import { PaymentStatus } from "../types/payment-status";

export async function handlePaymentCanceled(event: any) {
  const pi = event.data.object;

  const payment = await Payment.findOne({
    paymentIntentId: pi.id
  });

  if (!payment) return;

  const order = await Order.findById(payment.orderId);

  if (!order) return;

  payment.status = PaymentStatus.CANCELLED;
  order.status = OrderStatus.CANCELLED;

  await payment.save();
  await order.save();
}