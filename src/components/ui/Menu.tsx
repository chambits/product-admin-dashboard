import { OrderedListOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import { useNavigate } from "react-router-dom";
import { useCategoryMenuItems } from "../../features/categories/selectors/categorySelectors";
import { RouteMap } from "../../constants";

const menuKeys = ["products", "categories"] as const;
type MenuKey = (typeof menuKeys)[number];

const Menu = () => {
  const menuItems = useCategoryMenuItems();
  const navigate = useNavigate();

  const menuItemClickHandler = ({ key }: { key: MenuKey }) => {
    const route = RouteMap[key] ?? `/categories/${key}`;
    navigate(route);
  };

  return (
    <AntMenu
      onClick={(info) => menuItemClickHandler({ key: info.key as MenuKey })}
      theme="dark"
      defaultSelectedKeys={[menuKeys[0]]}
      defaultOpenKeys={[menuKeys[0]]}
      mode="inline"
      items={[
        {
          key: "products",
          label: "Products",
          icon: <OrderedListOutlined />,
        },
        {
          key: "categories",
          label: "Categories",
          icon: <ShoppingOutlined />,
          children: menuItems,
        },
      ]}
    />
  );
};

export default Menu;
