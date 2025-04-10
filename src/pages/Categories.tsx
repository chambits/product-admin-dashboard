import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { Badge } from "../components/ui/Badge";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import { Category } from "../features/categories/types";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  id: string;
  name: string;
  parentCategory: string;
  products: number;
  type: string;
  actions: string;
}

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();

  const categoryList =
    categories?.ids.map((id) => categories.entities[id]) || [];

  const getParentName = (parentId: string | null | undefined) => {
    if (!parentId) return "-";
    return categories?.entities[parentId]?.name || "Unknown";
  };

  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      field: "name",
      headerName: "Category Name",
      flex: 2,
      cellRenderer: (params: { data: Category }) => (
        <a onClick={() => navigate(`/categories/${params.data.id}`)}>
          {params.data.name}
        </a>
      ),
    },
    {
      field: "parentCategory",
      headerName: "Parent Category",
      flex: 2,
      cellRenderer: (params: { data: Category }) =>
        getParentName(params.data.parentId),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 2,
      cellRenderer: (params: { data: Category }) => (
        <Badge
          color={params.data.parentId ? "blue" : "green"}
          content={params.data.parentId ? "Subcategory" : "Main Category"}
        />
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 0.5,
      cellRenderer: (params: { data: Category }) => (
        <>
          {params.data.parentId && (
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/categories/${params.data.id}`)}
            />
          )}
        </>
      ),
      sortable: false,
      filter: false,
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  return (
    <PageTransition>
      <div style={{ width: "100%", height: "60vh" }}>
        <AgGridReact
          rowData={categoryList}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isLoading}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[5, 10, 20, 50]}
        />
      </div>
    </PageTransition>
  );
};

export default Categories;
