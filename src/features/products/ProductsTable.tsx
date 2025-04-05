import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { useState } from "react";
import { useGetProductsQuery } from "./productApi";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./productSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  stock: number;
  status: string;
}

const ProductsTable = () => {
  const { data, isLoading } = useGetProductsQuery();
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();

  console.log(data);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "name" },
    { field: "categoryId" },
    { field: "price" },
    { field: "stock" },
    { field: "status" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <AgGridReact
        onRowClicked={(e) => {
          setSelectedProduct(e.data);
          navigate(`/products/${e.data.id}`);
        }}
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default ProductsTable;
