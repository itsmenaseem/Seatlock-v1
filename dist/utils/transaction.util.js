"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMongoDBTransaction = withMongoDBTransaction;
const mongoose_1 = __importDefault(require("mongoose"));
async function withMongoDBTransaction(fn) {
    const session = await mongoose_1.default.startSession();
    try {
        return await session.withTransaction(async () => {
            return await fn(session);
        });
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
    finally {
        session.endSession();
    }
}
//# sourceMappingURL=transaction.util.js.map