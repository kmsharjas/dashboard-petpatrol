// export interface Product {
//   id?: number;
//   name: string;
//   desc: string;
//   price: number;
//   actual_price?: number;
//   pdt_img: string;
//   vedio_url: string;
//   unit: number;
//   category: number;
//   categorys?: string;
//   offertypes?: string;
//   subcategory?: number;
//   subCategory?: string;
//   isproductactive?: boolean; //text field
//   gst: number;
//   offer_type?: number; //offer type
// }

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  countInstock: number;
  animalCategory: number;
  animalCategory_name: string;
  serviceCategory: number;
  serviceSubcategory: number;
  included_gst: number;
  gstPercentage: number;
  packaging_type: number;
  packaging_type_name: string;
  offertitle: string;
  isProductiveactive: boolean;
  startDate: string;
  endDate: string;
  units: number;
  thumbnail_img: string;
  image: Image[];
}

interface Image {
  id?: number;
  images: string;
  product: number;
}
