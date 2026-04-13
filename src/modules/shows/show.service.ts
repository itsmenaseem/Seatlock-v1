import { NotFoundError } from "../../errors/not-found.error";
import {  ShowDoc } from "./show.model";
import { createShow,  findShowById, searchShows } from "./show.repository";
import { CreateShow } from "../../types/create-event.type";
import { Pagination } from "../../types/pagination.type";

export  function createShowService(data:CreateShow):Promise<ShowDoc>{
    return createShow(data);
}

export async function getShowByIdService(id:string,owner?:string):Promise<ShowDoc>{
     const query: {_id: string, owner?: string} = { _id: id }; 
        if (owner) {
            query.owner = owner;
        }
    const show = await findShowById(query);
    if(!show){
        throw new NotFoundError("Show not found");
    }
    return show;
}

export  function searchShowsService(query:string, pagination: Pagination):Promise<ShowDoc[]>{
    return  searchShows(query,pagination);
}


export function getAllShowsService(pagination: Pagination):Promise<ShowDoc[]>{
    return searchShows("",pagination);
}   




