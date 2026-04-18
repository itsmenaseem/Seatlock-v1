import { Order } from "../modules/orders/order.model";
import { Payment } from "../modules/payments/payment.model";
import { Ticket } from "../modules/tickets/ticket.model";
import { OrderStatus } from "../types/order-status";
import { PaymentStatus } from "../types/payment-status";
import { SeatStatus } from "../types/seat-status.type";

export async function handlePaymentSuccess(event: any) {
  const pi = event.data.object;

  const payment = await Payment.findOne({
    paymentIntentId: pi.id
  });

  if (!payment) return;
  if (payment.status === PaymentStatus.COMPLETED) return;
  payment.status = PaymentStatus.COMPLETED;
  const order = await Order.findOne({_id: payment.orderId});
  if (!order) return;
  order.isPaid = true;
  if(order.lockUntil.getTime() < Date.now()){
    order.status = OrderStatus.EXPIRED;
    await payment.save();
    await order.save();
    return;
  }
  const ticket = await Ticket.findById(order.ticketId);
  if (!ticket) return;
  if (ticket.status !== SeatStatus.BOOKED) {
    ticket.status = SeatStatus.BOOKED;
    order.status = OrderStatus.COMPLETED;
  } else {
     order.status = OrderStatus.EXPIRED;
  }
  await payment.save();
  await order.save();
  await ticket.save();
}