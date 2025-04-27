import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Card,
  Flex,
  Modal,
  Popconfirm,
  Skeleton,
  Space,
  Tooltip,
  Alert,
} from "antd";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../components/ui/Badge";
import { RouteMap } from "../../../constants";
import { formatDate } from "../../../utils/dateFormat";
import { Category } from "../../categories/types";
import { useDeleteProduct } from "..//hooks/useDeleteProduct";
import { useStatusColor } from "../hooks/useStatusColor";
import { Product, ProductStatus } from "../types";
import { ProductEditView } from "./ProductEditView";
ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  categoryName: string;
  category: Category;
  stock: number;
  status: ProductStatus;
  modifiedDate: string;
  actions: string;
}

interface ProductsTableProps {
  data: Product[] | undefined;
  isLoading: boolean;
}

const ProductTable: React.FC<ProductsTableProps> = React.memo(
  ({ data, isLoading }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
      null
    );
    const { deleteProductData } = useDeleteProduct();
    const { getStatusColor } = useStatusColor();

    useEffect(() => {
      if (selectedProduct) {
        setEditModalVisible(true);
      }
    }, [selectedProduct]);

    const editHandler = useCallback((data: Product) => {
      setSelectedProduct(data);
    }, []);

    const deleteHandler = useCallback(
      (id: string) => {
        deleteProductData(id);
      },
      [deleteProductData]
    );

    const statusCellRenderer = useCallback(
      (params: { value: ProductStatus }) => {
        return (
          <Badge color={getStatusColor(params.value)} content={params.value} />
        );
      },
      [getStatusColor]
    );

    const priceCellRenderer = useCallback(
      (params: { value: number; data: Product }) => {
        return `${params.data.currency}${params.value.toLocaleString()}`;
      },
      []
    );

    const categoryCellRenderer = useCallback((params: { value: Category }) => {
      return params.value.name;
    }, []);

    const dateCellRenderer = useCallback((params: { value: string }) => {
      return formatDate.full(params.value);
    }, []);

    const actionsCellRenderer = useCallback(
      (params: { data: Product }) => {
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
                  name="delete"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
      [deleteHandler, editHandler]
    );

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
        field: "category",
        headerName: "Category",
        cellRenderer: categoryCellRenderer,
        filter: "agTextColumnFilter",
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
        filter: "agTextColumnFilter",
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

    const defaultColDef = useMemo<ColDef>(() => {
      return {
        filter: "agTextColumnFilter",
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
      };
    }, []);

    if (isLoading) {
      return <TableSkeleton />;
    }

    return (
      <>
        <div style={{ width: "100%", height: "50vh" }}>
          <AgGridReact
            onRowClicked={(e) => {
              if (
                e.event &&
                !(e.event.target as HTMLElement).closest(".action-buttons")
              ) {
                navigate(`${RouteMap.products}/${e.data.id}`);
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
          title="Quick Edit"
          open={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false);
            setSelectedProduct(null);
          }}
          width={1000}
          footer={null}
        >
          <Flex vertical gap={16}>
            <Alert
              message="For full edit options, go to product details view"
              type="info"
              showIcon
            />
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
          </Flex>
        </Modal>
      </>
    );
  }
);

const TableSkeleton = () => (
  <Card>
    <Skeleton.Input active block style={{ marginBottom: 16, height: 32 }} />

    <Skeleton.Input active block style={{ marginBottom: 8, height: 40 }} />

    {[1, 2, 3, 4, 5].map((key) => (
      <Skeleton.Input
        key={key}
        active
        block
        style={{
          marginBottom: 8,
          height: 32,
          opacity: 1 - key * 0.15,
        }}
      />
    ))}

    <Flex justify="space-between" align="center" style={{ marginTop: 16 }}>
      <Skeleton.Input active style={{ width: 100 }} />
      <Skeleton.Input active style={{ width: 200 }} />
    </Flex>
  </Card>
);

export default ProductTable;
