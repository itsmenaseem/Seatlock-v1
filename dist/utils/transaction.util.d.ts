import mongoose from "mongoose";
export declare function withMongoDBTransaction<T>(fn: (session: mongoose.ClientSession) => Promise<T>): Promise<T>;
//# sourceMappingURL=transaction.util.d.ts.map