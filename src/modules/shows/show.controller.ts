import { Request, Response } from "express";
import { createShowService, getAllShowsService, getShowByIdService, searchShowsService} from "./show.service";

export async function createShowController(req:Request,res:Response){
    const {title,description} = req.body;
    const owner = req.user?.id
    const event = await createShowService({title,description,owner: owner as string});
    res.status(201).json(event);
}

export async function getShowByIdController(req:Request,res:Response){
    const {id} = req.params;
    const show = await getShowByIdService(id as string);
    res.status(200).json(show);
}

export async function searchShowsController(req:Request,res:Response){
    const {query,page,limit} = req.query;
    const pt = Number(page) || 1;
    const lt = Number(limit) || 10;
    const pagination = {
        page:pt,
        limit:lt
    }
    const shows = await searchShowsService(query as string, pagination);
    res.status(200).json(shows);
}

export async function getAllShowsController(req:Request,res:Response){
     const {page,limit} = req.query;
    const pt = Number(page) || 1;
    const lt = Number(limit) || 10;
    const pagination = {
        page:pt,
        limit:lt
    }
    const shows = await getAllShowsService(pagination);
    res.status(200).json(shows);
}






