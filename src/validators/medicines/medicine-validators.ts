import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  supplier_id: z.number().min(1, { message: "Supplier ID harus valid" }),
  stock: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Stok harus berupa angka",
    })
    .refine((val) => val > 0, {
      message: "Stok harus lebih dari 0",
    }),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Harga harus berupa angka",
    })
    .refine((val) => val > 0, {
      message: "Harga harus lebih dari 0",
    }),
  pharmacy_price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Harga di apotek harus berupa angka",
    })
    .refine((val) => val > 0, {
      message: "Harga di apotek harus lebih dari 0",
    }),
});

export type MedicineType = z.infer<typeof medicineSchema>;
