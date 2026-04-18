import { CreateUser } from "../../types/create-user.type";
import { UserDoc } from "./user.model";
export declare function findUserByEmail(email: string): Promise<UserDoc | null>;
export declare function findUserById(id: string): Promise<UserDoc | null>;
export declare function createUser(data: CreateUser): Promise<UserDoc>;
//# sourceMappingURL=user.repository.d.ts.map