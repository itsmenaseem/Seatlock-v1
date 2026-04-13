import { CreateShow } from "../../types/create-event.type";
import { Pagination } from "../../types/pagination.type";
import { Show, ShowDoc } from "./show.model";



export function createShow(data: CreateShow): Promise<ShowDoc> {
    return Show.create({
        ...data
    });
}


export function findShowById(query:{_id: string, owner?: string}): Promise<ShowDoc | null> {
    return Show.findOne(query);
}


export function searchShows(query: string, pagination: Pagination): Promise<ShowDoc[]> {
    const { page, limit } = pagination;
    return Show.find({
        $or:[
            {title:{$regex:query,$options:"i"}},
            {description:{$regex:query,$options:"i"}}
        ]
    })
    .skip((page - 1) * limit)
    .limit(limit);
}

