import { z } from "zod";
import { addressSchema } from "./address.schema";

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  paymentMethod: z.enum(["card", "paypal", "cod"]),
  couponCode: z.string().optional(),
  notes: z.string().max(500).optional(),
  saveAddress: z.boolean().default(false),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
