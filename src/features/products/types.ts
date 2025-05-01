import { Rule } from "antd/es/form";
import { ReactNode } from "react";
import { Category } from "../categories/types";
import { AttributeNameType } from "./attribute-types";

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

export type AttributeValueType =
  | string
  | number
  | boolean
  | string[]
  | Record<string, unknown>;

export interface ProductAttribute {
  code: string;
  type: AttributeNameType;
  value: AttributeValueType;
}

export enum ProductStatus {
  Active = "Active",
  Inactive = "Inactive",
  "Out of stock" = "Out of stock",
  Archived = "Archived",
  Draft = "Draft",
}

export interface ProductAttributeFieldType {
  name: string;
  label: string;
  show: (value: AttributeValueType) => ReactNode;
  edit: (name: string, value?: AttributeValueType) => ReactNode;
  rules?: Rule[];
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
