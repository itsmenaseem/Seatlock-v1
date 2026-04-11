import "dotenv/config"
import { app } from "./app";
import { portConfig } from "./configs/port.config";
import { MongoDBWrapper } from "./wrappers/db.wrapper";
import {MongoMemoryServer} from "mongodb-memory-server"
async function runServer(){
    try {
        const mongodb = new MongoMemoryServer();
        await mongodb.start();

        await MongoDBWrapper.connect(mongodb.getUri());
        const PORT = portConfig.PORT || 5000
        app.listen(PORT,()=>{
            console.log("server is listening on Port: ",PORT);
        })
    } catch (error) {
        await MongoDBWrapper.disconnect();
        process.exit(1);
    }
}

runServer();