export interface Medicine {
  id: number;
  name: string;
  stock: number;
  supplier_id: number;
  price: number;
  pharmacy_price: number;
  created_at: Date;
  updated_at: Date;
}
