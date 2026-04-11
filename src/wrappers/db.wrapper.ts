import mongoose from "mongoose";

 class MongoDB {
    async connect(url: string) {
        try {
            if (!url) {
                throw new Error("MongoDB connection string is not provided");
            }

            if (mongoose.connection.readyState === 1) {
                console.log("MongoDB already connected");
                return;
            }

            const conn = await mongoose.connect(url);
            console.log("MongoDB connected at host:", conn.connection.host);

        } catch (error) {
            console.error("Failed to connect to MongoDB");
            throw error;
        }
    }

    async disconnect() {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log("MongoDB disconnected");
        }
    }
}

export const MongoDBWrapper = new MongoDB();