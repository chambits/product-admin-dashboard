import { useParams } from "react-router-dom";

const CategoriesPage = () => {
  const { id } = useParams();
  return <div>CategoriesPage {id}</div>;
};

export default CategoriesPage;
