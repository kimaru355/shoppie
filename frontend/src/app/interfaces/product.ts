export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  type: string;
  size: string;
  quantity: number;
  stockLimit: number;
  images: string[];
}
export interface NewProduct {
  name: string;
  price: number;
  description: string;
  type: string;
  size: string;
  quantity: number;
  stockLimit: number;
  images: string[];
}