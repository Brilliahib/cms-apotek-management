import { z } from "zod";

export const purchaseSchema = z.object({
  pharmacy_id: z.number().min(1, { message: "Pharmacy ID harus valid" }),
  medicine_id: z.number().min(1, { message: "Medicine ID harus valid" }),
  admin_id: z.number().min(1, { message: "User ID harus valid" }),
  quantity: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Kuantitas/banyak harus berupa angka",
    })
    .refine((val) => val > 0, {
      message: "Kuantitas/banyak harus lebih dari 0",
    }),
});

export type PurchaseType = z.infer<typeof purchaseSchema>;
