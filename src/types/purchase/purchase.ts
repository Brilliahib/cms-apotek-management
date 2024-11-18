import { Medicine } from "../medicine/medicine";

export interface Purchase {
  id: number;
  admin_id: number;
  medicine_id: number;
  pharmacy_id: number;
  quantity: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  medicine: Medicine;
}
