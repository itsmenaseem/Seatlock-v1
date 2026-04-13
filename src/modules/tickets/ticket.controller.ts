import {Request , Response } from "express"
import { getShowByIdService } from "../shows/show.service";
import { createTicketService, getTicketsByShowService, reserveTicketService, updateTicketAmountService } from "./ticket.service";
export async function createTicketController(req:Request,res:Response){
    const {amount,showId} = req.body;
    const userId = req.user!.id;
    await getShowByIdService(showId,userId as string);
    const ticket = await createTicketService({amount,userId,showId});
    res.status(201).json(ticket);
}

export async function updateTicketAmountController(req:Request,res:Response){
    const {amount} = req.body;
    const {ticketId} = req.params
    const userId = req.user!.id
    const updatedTicket = await updateTicketAmountService(ticketId as string,amount,userId as string);    
    res.status(200).json({updatedTicket})
}

export async function getTicketsByShowController(req:Request,res:Response){
    const {showId} = req.params;
    const tickets = await getTicketsByShowService(showId as string);
    res.status(200).json({tickets});
}

export async function reserveTicketController(req:Request,res:Response){
    const {ticketId} = req.params
    const userId = req.user!.id;
    const ticket = await reserveTicketService(ticketId as string,userId as string);
    res.status(200).json({ticket});
}

