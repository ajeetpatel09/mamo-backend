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

  async getPaymentInfo(req: Request, res: Response) {
    try {
      const result = await paymentService.getPaymentInfo(req.params.chargeUID);
      return res.status(200).send(buildResponse(result, "success", null));
    } catch (error) {
      console.log(error);
    }
  }

  async createWebhooks(_req: Request, res: Response) {
    try {
      await paymentService.createWebhooks();
      return res.status(200).send(buildResponse(null, "success", null));
    } catch (error) {
      console.log(error);
    }
  }

  async updatePaymentStatus(req: Request, res: Response) {
    try {
      const result = await paymentService.updatePaymentStatus(req.body);
      return res.status(200).send(buildResponse(result, "success", null));
    } catch (error) {
      console.log(error);
    }
  }

  async getAllWebhooks(_req: Request, res: Response) {
    try {
      const result = await paymentService.getAllWebhooks();
      console.log('result', result);
      
      return res.status(200).send(buildResponse(result, "success", null));
    } catch (error) {
      console.log(error);
    }
  }
}

export default PaymentController;
