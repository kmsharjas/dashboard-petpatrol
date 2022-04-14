export interface Category {
  id?: number;
  category: string;
  image: string;
}

export interface SubCategory {
  id?: number;
  name: string;
  category: number;
}
