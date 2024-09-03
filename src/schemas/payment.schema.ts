import { z } from "zod";

export const PaymentSchema = z.object({
  status: z.string(),
  id: z.string(),
  amount: z.number(),
  amount_currency: z.string(),
  refund_amount: z.string(),
  refund_status: z.string(),
  custom_data: z.object({}),
  created_at: z.string(),
  subscription_id: z.string(),
  settlement_amount: z.string(),
  settlement_currency: z.string(),
  settlement_date: z.string(),
  customer_details: z.object({
    name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    comment: z.string(),
  }),
  payment_method: z.object({
    card_id: z.string(),
    type: z.string(),
    card_holder_name: z.string(),
    card_last4: z.string(),
    card_expiry_month: z.string(),
    card_expiry_year: z.string(),
    origin: z.string(),
  }),
  settlement_fee: z.string(),
  settlement_vat: z.string(),
  payment_link_id: z.string(),
  payment_link_url: z.string(),
  external_id: z.nullable(z.string()),
  billing_descriptor: z.string(),
  error_code: z.nullable(z.string()),
  error_message: z.nullable(z.string()),
  next_payment_date: z.nullable(z.string()),
  event_type: z.string(), //enum.
});

export type Payment = z.infer<typeof PaymentSchema>;
