import { Types } from "mongoose";
import { CreateShow } from "../../types/create-event.type";
export interface ShowDoc extends CreateShow, Document {
}
export declare const Show: import("mongoose").Model<ShowDoc, {}, {}, {}, import("mongoose").Document<unknown, {}, ShowDoc, {}, import("mongoose").DefaultSchemaOptions> & ShowDoc & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ShowDoc>;
//# sourceMappingURL=show.model.d.ts.map