import { CreateShow } from "../../types/create-event.type";
import { Pagination } from "../../types/pagination.type";
import { ShowDoc } from "./show.model";
export declare function createShow(data: CreateShow): Promise<ShowDoc>;
export declare function findShowById(query: {
    _id: string;
    owner?: string;
}): Promise<ShowDoc | null>;
export declare function searchShows(query: string, pagination: Pagination): Promise<ShowDoc[]>;
//# sourceMappingURL=show.repository.d.ts.map