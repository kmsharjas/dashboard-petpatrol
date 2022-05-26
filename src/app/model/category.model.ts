// export interface Category {
//   id?: number;
//   category: string;
//   image: string;
// }
export interface Category {
  id?: number;
  animal: string;
  image?: any;
}

// export interface SubCategory {
//   id?: number;
//   name: string;
//   category: number;
// }

export interface SubCategory {
  id?: number;
  service: string;
  image?: any;
  animal: number;
}

export interface ServiceSub {
  id?: number;
  subcategory: string;
  image?: any;
  service: number;
}
