import { ShowDoc } from "./show.model";
import { CreateShow } from "../../types/create-event.type";
import { Pagination } from "../../types/pagination.type";
export declare function createShowService(data: CreateShow): Promise<ShowDoc>;
export declare function getShowByIdService(id: string, owner?: string): Promise<ShowDoc>;
export declare function searchShowsService(query: string, pagination: Pagination): Promise<ShowDoc[]>;
export declare function getAllShowsService(pagination: Pagination): Promise<ShowDoc[]>;
//# sourceMappingURL=show.service.d.ts.map