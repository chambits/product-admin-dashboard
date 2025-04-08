import { StatusType } from "../../hooks/useStatusColor";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  stock: number;
  status: StatusType;
  attributes: ProductAttribute[];
  createdDate: string;
  modifiedDate: string;
}

export type ProductAttributeValue = string | number | boolean | string[];

export interface ProductAttribute {
  code: string;
  value: ProductAttributeValue;
}
