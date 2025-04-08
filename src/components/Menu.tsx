import { OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import { useNavigate } from "react-router-dom";
import { useCategoryMenuItems } from "../features/categories/selectors/categorySelectors";

type MenuKey = "product-list" | "dashboard" | "categories" | "products";

export const ROUTE_MAP: Record<string, string> = {
  dashboard: "/",
  categories: "/categories",
  products: "/products",
  productAdd: "/products/new",
  productDetails: "/products/:id",
  categoryDetails: "/categories/:id",
};

const Menu = () => {
  const menuItems = useCategoryMenuItems();
  const navigate = useNavigate();

  const menuItemClickHandler = ({ key }: { key: MenuKey }) => {
    const route = ROUTE_MAP[key] ?? `/categories/${key}`;
    navigate(route);
  };

  return (
    <AntMenu
      onClick={(info) => menuItemClickHandler({ key: info.key as MenuKey })}
      theme="dark"
      defaultSelectedKeys={["dashboard"]}
      defaultOpenKeys={["dashboard"]}
      mode="inline"
      items={[
        {
          key: "dashboard",
          label: "Dashboard",
          icon: <UserOutlined />,
        },
        {
          key: "products",
          label: "Products",
          icon: <OrderedListOutlined />,
          children: [
            {
              key: "products",
              label: "Product List",
            },
            {
              key: "categories",
              label: "Categories",
              children: menuItems,
            },
          ],
        },
      ]}
    />
  );
};

export default Menu;
