"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = require("./modules/users/user.route");
const error_middleware_1 = require("./middlewares/error.middleware");
const show_route_1 = require("./modules/shows/show.route");
const ticket_route_1 = require("./modules/tickets/ticket.route");
const order_route_1 = require("./modules/orders/order.route");
const payment_route_1 = require("./modules/payments/payment.route");
const stripe_config_1 = require("./configs/stripe.config");
const stripe_wrapper_1 = require("./wrappers/stripe.wrapper");
const stripe_event_util_1 = require("./utils/stripe-event.util");
const app = (0, express_1.default)();
exports.app = app;
app.post("/webhook", express_1.default.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe_wrapper_1.StripeWrapper.client.webhooks.constructEvent(req.body, sig, stripe_config_1.stripeConfig.STRIPE_WEBHOOK_SECRET_KEY);
        await (0, stripe_event_util_1.handleStripeEvent)(event);
        res.json({ received: true });
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/users", user_route_1.UserRoutes);
app.use("/api/shows", show_route_1.ShowRoutes);
app.use("/api/tickets", ticket_route_1.TicketRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.use("/api/payments", payment_route_1.PaymentRoutes);
app.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map