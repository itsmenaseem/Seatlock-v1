import mongoose from "mongoose";
import { CreateOrder } from "../../types/create-order.type";
import { Order, OrderDoc } from "./order.model";
import { OrderStatus } from "../../types/order-status";

export async function createOrder(data: CreateOrder,session: mongoose.ClientSession | null = null): Promise<OrderDoc> {
  const order = new Order(data);
  await order.save({ session });
  return order;
}

export function findValidOrderForCheckout(orderId:string,userId:string):Promise<OrderDoc|null>{
  return Order.findOne({
    _id:orderId,
    userId,
    lockUntil:{$gt:new Date()},
    status: OrderStatus.CREATED,
    isPaid: false
  })
}