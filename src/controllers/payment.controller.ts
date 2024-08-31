import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import { buildResponse } from "../common/utils";

const paymentService = new PaymentService();
class PaymentController {
  async generatePaymentLink(req: Request, res: Response) {
    try {
      const result = await paymentService.generatePaymentLink(req.body);
      return res.status(200).send(buildResponse(result, "success", null));
    } catch (error) {
      console.log(error);
    }
  }
}

export default PaymentController;
