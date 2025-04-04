import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import { ROUTE_MAP } from "./components/Menu";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTE_MAP.dashboard} element={<DashboardPage />} />
            <Route path={ROUTE_MAP.products} element={<ProductsPage />} />
            <Route
              path={`${ROUTE_MAP.products}/:id`}
              element={<ProductDetailsPage />}
            />
            <Route
              path={`${ROUTE_MAP.categories}/:id`}
              element={<CategoriesPage />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
