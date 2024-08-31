import { Router } from "express";
import paymentRouter from "./payment.routes";
const router = Router({ mergeParams: true });

router.use("/payment", paymentRouter);

export default router;
