import express from "express"
import cookieParser from "cookie-parser"
import { UserRoutes } from "./modules/users/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ShowRoutes } from "./modules/shows/show.route";
import { TicketRoutes } from "./modules/tickets/ticket.route";
import { OrderRoutes } from "./modules/orders/order.route";
import { PaymentRoutes } from "./modules/payments/payment.route";
import { stripeConfig } from "./configs/stripe.config";
import { StripeWrapper } from "./wrappers/stripe.wrapper";
import { handleStripeEvent } from "./utils/stripe-event.util";
import cors from "cors";
const app = express();

app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
    let event;
  try {
    event = StripeWrapper.client.webhooks.constructEvent(req.body,sig,stripeConfig.STRIPE_WEBHOOK_SECRET_KEY!);
    await handleStripeEvent(event);
    res.json({ received: true });
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
    
}
);
app.use(express.json())
app.use(cookieParser())

app.use("/api/users",UserRoutes)
app.use("/api/shows", ShowRoutes)
app.use("/api/tickets",TicketRoutes)
app.use("/api/orders", OrderRoutes)
app.use("/api/payments",PaymentRoutes)
app.use(errorMiddleware)

export {app}