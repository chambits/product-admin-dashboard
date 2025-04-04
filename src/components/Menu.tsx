import { ProductOutlined, UserOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import { useCategoryMenuItems } from "../app/store/selectors/categorySelectors";
import { useNavigate } from "react-router-dom";

type MenuKey = "products-list" | "dashboard" | "categories" | "products";

export const ROUTE_MAP: Record<MenuKey, string> = {
  "products-list": "/products",
  dashboard: "/",
  categories: "/categories",
  products: "/products",
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
          icon: <ProductOutlined />,
          children: [
            {
              key: "products-list",
              label: "Products List",
              icon: <UserOutlined />,
            },
            {
              key: "categories",
              label: "Categories",
              icon: <ProductOutlined />,
              children: menuItems,
            },
          ],
        },
      ]}
    />
  );
};

export default Menu;
