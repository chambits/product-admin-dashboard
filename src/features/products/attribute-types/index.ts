import { TagsAttributeType } from "./TagsAttributeType";
import { BooleanAttributeType } from "./BooleanAttributeType";
import { NumberAttributeType } from "./NumberAttributeType";
import { ParcelAttributeType } from "./ParcelAttributeType";
import { StringAttributeType } from "./StringAttributeType";
import { ProductAttributeFieldType } from "../types";

export const attributeTypes: ProductAttributeFieldType[] = [
  StringAttributeType,
  NumberAttributeType,
  BooleanAttributeType,
  TagsAttributeType,
  ParcelAttributeType,
];

export type AttributeNameType =
  | "number"
  | "string"
  | "boolean"
  | "tags"
  | "parcel";

export const getAttributeType = (name: string) => {
  const type = attributeTypes.find((type) => type.name === name);
  return type;
};
