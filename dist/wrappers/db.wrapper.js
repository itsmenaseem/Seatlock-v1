"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBWrapper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDB {
    async connect(url) {
        try {
            if (!url) {
                throw new Error("MongoDB connection string is not provided");
            }
            if (mongoose_1.default.connection.readyState === 1) {
                console.log("MongoDB already connected");
                return;
            }
            const conn = await mongoose_1.default.connect(url);
            console.log("MongoDB connected at host:", conn.connection.host);
        }
        catch (error) {
            console.error("Failed to connect to MongoDB");
            throw error;
        }
    }
    async disconnect() {
        if (mongoose_1.default.connection.readyState !== 0) {
            await mongoose_1.default.connection.close();
            console.log("MongoDB disconnected");
        }
    }
}
exports.MongoDBWrapper = new MongoDB();
//# sourceMappingURL=db.wrapper.js.map