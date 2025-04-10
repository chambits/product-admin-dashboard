import { render as rtlRender } from "@testing-library/react";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { apiSlice } from "../app/api/apiSlice";
import uiReducer from "../app/ui/uiSlice";
import productReducer from "../features/products/productSlice";
import categoryReducer from "../features/categories/categorySlice";
import authReducer from "../features/auth/authSlice";
import { NotificationProvider } from "../providers/NotificationProvider";
import React, { ReactNode } from "react";
import { vi } from "vitest";

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      ui: uiReducer,
      product: productReducer,
      category: categoryReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });
};

interface WrapperProps {
  children: ReactNode;
}

interface RenderOptions {
  preloadedState?: Record<string, unknown>;
  store?: ReturnType<typeof createTestStore>;
  renderOptions?: Parameters<typeof rtlRender>[1];
}

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: RenderOptions = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <ConfigProvider>
          <NotificationProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </NotificationProvider>
        </ConfigProvider>
      </Provider>
    );
  }

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { configureStore };
export { render, mockNavigate };
