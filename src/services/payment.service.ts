import axios from "axios";
import { Request } from "express";
import { Payment } from "../schemas/payment.schema";

class PaymentService {
  async generatePaymentLink(payload: any) {
    // Environment variables for MamoPay API
    const MAMOPAY_API_KEY = process.env.MAMOPAY_API_KEY || "";
    const MAMOPAY_API_URL = process.env.MAMOPAY_API_URL || "";

    // Make the POST request to MamoPay API
    try {
      const response = await axios.post(
        `${MAMOPAY_API_URL}/manage_api/v1/links`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${MAMOPAY_API_KEY}`, // Include the API key
            "Content-Type": "application/json",
          },
        }
      );
      // Return the payment link from the response
      return response.data;
    } catch (error) {
      if (error.response) {
        // Log the response status and errors
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);

        // Inspect the errors array in the response
        if (error.response.data.errors) {
          console.error("Validation Errors:", error.response.data.errors);
        }

        // Re-throw the error or handle it as appropriate
        throw new Error(
          `Failed to generate payment link: ${error.response.data.error_code}`
        );
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", error.message);
        throw new Error(
          "An unexpected error occurred while generating the payment link."
        );
      }
    }
  }

  async getPaymentInfo(chargeUID: string) {
    // Environment variables for MamoPay API
    const MAMOPAY_API_KEY = process.env.MAMOPAY_API_KEY || "";
    const MAMOPAY_API_URL = process.env.MAMOPAY_API_URL || "";

    // Make the GET request to MamoPay API
    try {
      const response = await axios.get(
        `${MAMOPAY_API_URL}/api/v2/charges/${chargeUID}`,
        {
          headers: {
            Authorization: `Bearer ${MAMOPAY_API_KEY}`, // Include the API key
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Log the response status and errors
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
        // Re-throw the error or handle it as appropriate
        throw new Error(
          `Failed to get payment info: ${error.response.data.error_code}`
        );
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", error.message);
        throw new Error(
          "An unexpected error occurred while getting the payment info."
        );
      }
    }
  }

  async createWebhooks() {
    // Environment variables for MamoPay API
    const MAMOPAY_API_KEY = process.env.MAMOPAY_API_KEY || "";
    const MAMOPAY_API_URL = process.env.MAMOPAY_API_URL || "";
    const options = {
      method: "POST",
      url: `${MAMOPAY_API_URL}/manage_api/v1/webhooks`,
      headers: {
        Authorization: `Bearer ${MAMOPAY_API_KEY}`,
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        // url: "https://4nc179qz-8000.inc1.devtunnels.ms/api/v1/payment/update-payment-status",
        url: "https://unified-minnow-multiply.ngrok-free.app/api/v1/payment/update-payment-status",
        enabled_events: ["charge.failed", "charge.succeeded"],
        auth_header: `Bearer ${MAMOPAY_API_KEY}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("response from createWebhooks", response.data);
      })
      .catch(function (error) {
        if (error.response) {
          // Log the response status and errors
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          // Re-throw the error or handle it as appropriate
          throw new Error(
            `Failed to get payment info: ${error.response.data.error_code}`
          );
        } else {
          // Handle unexpected errors
          console.error("Unexpected error:", error.message);
          throw new Error(
            "An unexpected error occurred while getting the payment info."
          );
        }
      });
  }

  async updatePaymentStatus(payload: Payment) {
    // console.log("payload in update payment status", payload);
    if (payload.status === "captured") {
      console.log("successfull....");
    } else {
      console.log("failed....");
    }
    return true;
  }

  async getAllWebhooks() {
    // Environment variables for MamoPay API
    const MAMOPAY_API_KEY = process.env.MAMOPAY_API_KEY || "";
    const MAMOPAY_API_URL = process.env.MAMOPAY_API_URL || "";

    const options = {
      method: "GET",
      url: `${MAMOPAY_API_URL}/manage_api/v1/webhooks`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${MAMOPAY_API_KEY}`,
      },
    };

    const result = axios
      .request(options)
      .then(function (response) {
        // console.log("response in getAllWebhooks", response.data);
        return response.data;
      })
      .catch(function (error) {
        if (error.response) {
          // Log the response status and errors
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          // Re-throw the error or handle it as appropriate
          throw new Error(
            `Failed to get payment info: ${error.response.data.error_code}`
          );
        } else {
          // Handle unexpected errors
          console.error("Unexpected error:", error.message);
          throw new Error(
            "An unexpected error occurred while getting the payment info."
          );
        }
      });

    return result;
  }
}

export default PaymentService;
