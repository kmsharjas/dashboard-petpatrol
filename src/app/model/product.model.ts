export interface Product {
  id?: number;
  name: string;
  desc: string;
  price: number;
  actual_price?: number;
  pdt_img: string;
  vedio_url: string;
  unit: number;
  category: number;
  categorys?: string;
  offertypes?: string;
  subcategory?: number;
  subCategory?: string;
  isproductactive?: boolean; //text field
  gst: number;
  offer_type?: number; //offer type
}
