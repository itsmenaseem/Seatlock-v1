import { Request, Response } from "express";
import { createPaymentService } from "./payment.service";

export async function createPaymentController(req: Request, res: Response) {
    const { orderId } = req.body;
    const userId = req.user!.id;
    const data = await createPaymentService(orderId, userId);
    res.status(201).json(data);
}