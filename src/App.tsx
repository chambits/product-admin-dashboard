import { Spin } from "antd";
import "antd/dist/reset.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RouteMap } from "./constants";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import { NotificationProvider } from "./providers/NotificationProvider";

const LazyProductsPage = lazy(() => import("./pages/ProductsPage"));
const LazyProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const LazyCategoriesDetailsPage = lazy(
  () => import("./pages/CategoriesDetailsPage")
);
const LazyCategoryListPage = lazy(() => import("./pages/Categories"));
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LazyProductAddPage = lazy(() => import("./pages/ProductAddPage"));

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route path={RouteMap.home} element={<LazyProductsPage />} />
              <Route
                path={RouteMap.productAdd}
                element={<LazyProductAddPage />}
              />
              <Route path={RouteMap.products} element={<LazyProductsPage />} />
              <Route
                path={RouteMap.productDetails}
                element={<LazyProductDetailsPage />}
              />
              <Route
                path={RouteMap.categoryDetails}
                element={<LazyCategoriesDetailsPage />}
              />
              <Route
                path={RouteMap.categories}
                element={<LazyCategoryListPage />}
              />
            </Route>
            <Route path="*" element={<LazyNotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
