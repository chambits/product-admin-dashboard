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

export interface CreateProductRequest
  extends Omit<Product, "id" | "createdDate" | "modifiedDate" | "category"> {
  category: string;
}

export interface UpdateProductRequest
  extends Omit<
    Product,
    "id" | "createdDate" | "modifiedDate" | "category" | "attributes"
  > {
  category: string;
  attributes?: Record<string, ProductAttribute>;
}
