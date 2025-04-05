export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  stock: number;
  status: string;
  attributes: ProductAttribute[];
}

export interface ProductAttribute {
  code: string;
  value: string | number | boolean;
}
