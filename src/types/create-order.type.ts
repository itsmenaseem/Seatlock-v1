import { OrderStatus } from "./order-status";


export interface CreateOrder{
    userId:string;
    ticketId:string;
    lockUntil:Date;
    amount:number;
    status?:OrderStatus;
    isPaid?:boolean;
}