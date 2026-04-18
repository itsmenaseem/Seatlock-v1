import mongoose from "mongoose";
export interface UserDoc extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
    generateJWT(): string;
}
export declare const User: mongoose.Model<UserDoc, {}, {}, {}, mongoose.Document<unknown, {}, UserDoc, {}, mongoose.DefaultSchemaOptions> & UserDoc & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, UserDoc>;
//# sourceMappingURL=user.model.d.ts.map