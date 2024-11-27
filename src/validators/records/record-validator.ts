import { z } from "zod";

export const medicalRecordSchema = z.object({
  medicine_id: z.number().min(1, { message: "Pharmacy ID harus valid" }),
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  phone_number: z.string().regex(/^(\+62|62|0)[2-9]\d{7,11}$/, {
    message: "Nomor telepon tidak valid",
  }),
  date_of_birth: z
    .string()
    .min(1, { message: "Tanggal selesai harus diisi" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Format tanggal selesai tidak valid",
    }),

  medical_notes: z.string().optional(),
  prescription: z.string().optional(),
});

export type MedicalRecordType = z.infer<typeof medicalRecordSchema>;
