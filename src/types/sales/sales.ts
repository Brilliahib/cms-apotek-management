import { Medicine } from "../medicine/medicine";

export interface Sales {
  id: number;
  user_id: number;
  medicine_id: number;
  pharmacy_id: number;
  quantity: number;
  price: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  medicine: Medicine;
}
