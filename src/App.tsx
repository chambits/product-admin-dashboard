import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import { ROUTE_MAP } from "./components/Menu";
import LoginPage from "./pages/LoginPage";
import { NotificationProvider } from "./providers/NotificationProvider";
import ProductAddPage from "./pages/ProductAddPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
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
              <Route path={ROUTE_MAP.dashboard} element={<DashboardPage />} />
              <Route path={ROUTE_MAP.productAdd} element={<ProductAddPage />} />
              <Route path={ROUTE_MAP.products} element={<ProductsPage />} />
              <Route
                path={ROUTE_MAP.productDetails}
                element={<ProductDetailsPage />}
              />
              <Route
                path={ROUTE_MAP.categoryDetails}
                element={<CategoriesPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
