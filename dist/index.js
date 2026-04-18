"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const port_config_1 = require("./configs/port.config");
const db_wrapper_1 = require("./wrappers/db.wrapper");
const db_config_1 = require("./configs/db.config");
const stripe_config_1 = require("./configs/stripe.config");
const stripe_wrapper_1 = require("./wrappers/stripe.wrapper");
async function runServer() {
    try {
        // const mongodb = new MongoMemoryServer();
        // await mongodb.start();
        const stripeKey = stripe_config_1.stripeConfig.STRIPE_SECRET_KEY;
        stripe_wrapper_1.StripeWrapper.connect(stripeKey);
        await db_wrapper_1.MongoDBWrapper.connect(db_config_1.dbConfig.MONGO_URI);
        const PORT = port_config_1.portConfig.PORT || 5000;
        app_1.app.listen(PORT, () => {
            console.log("server is listening on Port: ", PORT);
        });
    }
    catch (error) {
        await db_wrapper_1.MongoDBWrapper.disconnect();
        process.exit(1);
    }
}
runServer();
//# sourceMappingURL=index.js.map