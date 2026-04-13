import express from "express"
import cookieParser from "cookie-parser"
import { UserRoutes } from "./modules/users/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ShowRoutes } from "./modules/shows/show.route";
import { TicketRoutes } from "./modules/tickets/ticket.route";

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/users",UserRoutes)
app.use("/api/shows", ShowRoutes)
app.use("/api/tickets",TicketRoutes)
app.use(errorMiddleware)

export {app}