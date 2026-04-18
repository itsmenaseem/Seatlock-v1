
import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { requestValidationMiddleware } from "../../middlewares/request-validaton.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createPaymentController } from "./payment.controller";
import { Payment } from "./payment.model";
const router = Router();

router.post("/checkout",
    authMiddleware,
    [
    body("orderId")
        .notEmpty().withMessage("orderId is required")
        .isMongoId().withMessage("Invalid orderId"),
],requestValidationMiddleware,createPaymentController);


router.get("/verify/:paymentId",authMiddleware,[
    param("paymentId")
        .notEmpty().withMessage("PaymentId is required")
        .bail()
        .isMongoId().withMessage("Invalid paymentId")
],
    requestValidationMiddleware,
    async(req:Request, res:Response)=>{
    const {paymentId} = req.params;
    const userId = req.user!.id;
    const payment = await Payment.findOne({_id:paymentId!,userId});
    return res.json({payment})
})

export {router as PaymentRoutes}