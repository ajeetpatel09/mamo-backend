import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post("/get-link", paymentController.generatePaymentLink);
paymentRouter.get("/get-info/:chargeUID", paymentController.getPaymentInfo);
export default paymentRouter