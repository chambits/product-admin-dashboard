// src/features/products/api/productsAdapter.ts
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Product } from "../types";

export const productsAdapter = createEntityAdapter<Product>();
export const initialState = productsAdapter.getInitialState();
