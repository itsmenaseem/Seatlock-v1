import { Request, Response } from "express";
import { createOrderService } from "./order.service";


export async function createOrderController(req:Request,res:Response){
    const {ticketId,version} = req.body;
    const userId = req.user!.id;
    const order = await createOrderService(ticketId,userId,version);
    res.status(201).json(order);
}