import { Category } from "../categories/types";

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  category: Category;
  stock: number;
  status: ProductStatus;
  attributes: ProductAttribute[];
  createdDate: string;
  modifiedDate: string;
}

export type ProductAttributeValue = string | number | boolean | string[];

export interface ProductAttribute {
  code: string;
  value: ProductAttributeValue;
}

export enum ProductStatus {
  Active = "Active",
  Inactive = "Inactive",
  "Out of stock" = "Out of stock",
  Archived = "Archived",
  Draft = "Draft",
}

export interface NormalizedProduct {
  ids: string[];
  entities: { [key: string]: Product };
}
export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category: string;
  attributes?: ProductAttribute[];
  id?: string;
  createdDate?: string;
  modifiedDate?: string;
  currency?: string;
}

export interface UpdateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category: string;
  attributes?: Record<string, ProductAttribute>;
}
