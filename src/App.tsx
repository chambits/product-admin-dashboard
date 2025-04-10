import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import CategoriesDetailsPage from "./pages/CategoriesDetailsPage";
import CategoryListPage from "./pages/CategoryListPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import { NotificationProvider } from "./providers/NotificationProvider";
import { RouteMap } from "./constants";

export function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path={RouteMap.home} element={<ProductsPage />} />
              <Route path={RouteMap.productAdd} element={<ProductAddPage />} />
              <Route path={RouteMap.products} element={<ProductsPage />} />
              <Route
                path={RouteMap.productDetails}
                element={<ProductDetailsPage />}
              />
              <Route
                path={RouteMap.categoryDetails}
                element={<CategoriesDetailsPage />}
              />
              {/* <Route
                path={RouteMap.categories}
                element={<CategoryListPage />}
              /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
