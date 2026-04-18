import { OrderDoc } from "./order.model";
export declare function createOrderService(ticketId: string, userId: string, version: number): Promise<OrderDoc>;
export declare function findValidOrderForCheckoutService(orderId: string, userId: string): Promise<OrderDoc>;
//# sourceMappingURL=order.service.d.ts.map