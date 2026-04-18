import mongoose from "mongoose";
import { CreateOrder } from "../../types/create-order.type";
import { OrderDoc } from "./order.model";
export declare function createOrder(data: CreateOrder, session?: mongoose.ClientSession | null): Promise<OrderDoc>;
export declare function findValidOrderForCheckout(orderId: string, userId: string): Promise<OrderDoc | null>;
//# sourceMappingURL=order.repository.d.ts.map