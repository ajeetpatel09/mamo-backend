import axios from "axios";

class PaymentService {
  async generatePaymentLink(payload: any) {
    // Environment variables for MamoPay API
    const MAMOPAY_API_KEY = process.env.MAMOPAY_API_KEY || "";
    const MAMOPAY_API_URL = process.env.MAMOPAY_API_URL || "";
    console.log("MAMOPAY_API_KEY", MAMOPAY_API_KEY);
    console.log("MAMOPAY_API_URL", MAMOPAY_API_URL);

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
}

export default PaymentService;
