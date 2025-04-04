import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </MainLayout>
    </>
  );
}

export default App;
