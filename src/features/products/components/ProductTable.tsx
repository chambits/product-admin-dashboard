import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal, Popconfirm, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAP } from "../../../components/Menu";
import { StatusBadge } from "../../../components/StatusBadge";
import { StatusType } from "../../../hooks/useStatusColor";
import { formatDate } from "../../../utils/dateFormat";
import { useCategoryNames } from "../../categories/selectors/categorySelectors";
import { useDeleteProduct } from "..//hooks/useDeleteProduct";
import { Product } from "../types";
import { ProductEditView } from "./ProductEditView";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  stock: number;
  status: StatusType;
  modifiedDate: string;
  actions: string;
}

interface ProductsTableProps {
  data: Product[] | undefined;
  isLoading: boolean;
}

const ProductTable = React.memo(({ data, isLoading }: ProductsTableProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const navigate = useNavigate();
  const categoryNames = useCategoryNames();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { deleteProductData } = useDeleteProduct();

  useEffect(() => {
    if (selectedProduct) {
      setEditModalVisible(true);
    }
  }, [selectedProduct]);

  const statusCellRenderer = (params: { value: StatusType }) => {
    return <StatusBadge status={params.value} />;
  };

  const priceCellRenderer = (params: { value: number }) => {
    return `${params.value.toLocaleString()}`;
  };

  const categoryCellRenderer = (params: { value: string }) => {
    return categoryNames[params.value] || params.value;
  };

  const dateCellRenderer = (params: { value: string }) => {
    return formatDate.full(params.value);
  };

  const editHandler = (data: Product) => {
    setSelectedProduct(data);
  };

  const deleteHandler = (id: string) => {
    deleteProductData(id);
  };

  const actionsCellRenderer = (params: { data: Product }) => {
    return (
      <Space className="action-buttons">
        <Tooltip title="Edit">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              editHandler(params.data);
            }}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={(e) => {
              e?.stopPropagation();
              deleteHandler(params.data.id);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </Tooltip>
      </Space>
    );
  };

  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      field: "id",
      headerName: "ID",
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1.5,
    },
    {
      field: "categoryId",
      headerName: "Category",
      cellRenderer: categoryCellRenderer,
      flex: 2,
    },
    {
      field: "price",
      headerName: "Price",
      cellRenderer: priceCellRenderer,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: statusCellRenderer,
      flex: 1.5,
    },
    {
      field: "modifiedDate",
      headerName: "Last Modified",
      cellRenderer: dateCellRenderer,
      flex: 1.5,
      sort: "desc",
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: actionsCellRenderer,
      sortable: false,
      filter: false,
      width: 120,
      pinned: "right",
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  // TODO: Add loading Skeleton
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div style={{ width: "100%", height: "50vh" }}>
        <AgGridReact
          onRowClicked={(e) => {
            if (
              e.event &&
              !(e.event.target as HTMLElement).closest(".action-buttons")
            ) {
              navigate(`${ROUTE_MAP.products}/${e.data.id}`);
            }
          }}
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isLoading}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[5, 10, 20, 50]}
        />
      </div>

      <Modal
        title="Edit Product"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedProduct(null);
        }}
        width={1000}
        footer={null}
      >
        <ProductEditView
          product={selectedProduct ?? ({} as Product)}
          onSuccess={() => {
            setEditModalVisible(false);
            setSelectedProduct(null);
          }}
          onCancel={() => {
            setEditModalVisible(false);
            setSelectedProduct(null);
          }}
        />
      </Modal>
    </>
  );
});

export default ProductTable;
