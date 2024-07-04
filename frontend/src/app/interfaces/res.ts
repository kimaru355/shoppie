export interface Res<T> {
  totalCategories: number;
  totalProducts: number;
  totalUser: number;
  success: boolean;
  message: string;
  data: T;
}
