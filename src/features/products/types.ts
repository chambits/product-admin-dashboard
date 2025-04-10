export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  categoryId: string;
  categoryName: string;
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
