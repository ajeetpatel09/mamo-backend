import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post("/get-link", paymentController.generatePaymentLink);
export default paymentRouter