import "dotenv/config"
import { app } from "./app";
import { portConfig } from "./configs/port.config";
import { MongoDBWrapper } from "./wrappers/db.wrapper";
import { dbConfig } from "./configs/db.config";
import { stripeConfig } from "./configs/stripe.config";
import { StripeWrapper } from "./wrappers/stripe.wrapper";
async function runServer(){
    try {
        // const mongodb = new MongoMemoryServer();
        // await mongodb.start();
        const stripeKey = stripeConfig.STRIPE_SECRET_KEY
        StripeWrapper.connect(stripeKey!)
        await MongoDBWrapper.connect(dbConfig.MONGO_URI!);
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