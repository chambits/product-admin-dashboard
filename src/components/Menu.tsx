import { Menu as AntMenu } from "antd";
import { useAppSelector } from "../app/hooks";
import { selectCategoryMenuItems } from "../app/store/selectors/categorySelectors";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";

const Menu = () => {
  useGetCategoriesQuery();
  const menuItems = useAppSelector(selectCategoryMenuItems);
  return (
    <AntMenu
      //   onClick={onClick}
      theme="dark"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={menuItems}
    />
  );
};

export default Menu;
