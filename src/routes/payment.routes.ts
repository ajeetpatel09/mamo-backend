import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post("/get-link", paymentController.generatePaymentLink);
paymentRouter.get("/get-info/:chargeUID", paymentController.getPaymentInfo);
paymentRouter.post("/create-webhooks", paymentController.createWebhooks);
paymentRouter.post("/update-payment-status", paymentController.updatePaymentStatus);
paymentRouter.get("/get-all-webhooks", paymentController.getAllWebhooks);
export default paymentRouter