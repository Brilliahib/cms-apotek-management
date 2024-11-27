import { Medicine } from "../medicine/medicine";

export interface MedicalRecords {
  id: number;
  medicine_id: number;
  name: string;
  phone_number: string;
  date_of_birth: Date;
  medical_notes: string;
  prescription: string;
  medicine: Medicine;
}
