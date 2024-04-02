import Category from "../../components/Category/Category";
import { Link, useParams } from "react-router-dom";
import { MENU_ITEMS } from "../../components/menuItems";
import "./CategoryDetail.css";

function CategoryDetail() {
  const { name, product } = useParams();
  const categories = MENU_ITEMS.filter(
    (element) => name === element.to.substring(10)
  );

  const categoryProductList = categories[0].children.data.find((element) => {
    return element.to === "/category/" + name + "/" + product;
  });
  return (
    <div className="cateDetail">
      {categoryProductList === undefined && (
        <ul className="cateList">
          {categories[0].children.data.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.to}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="wrapper">
        {categoryProductList === undefined ? (
          categories[0].children.data.map((item, index) => {
            return <Category key={index} data={item} pageCate />;
          })
        ) : (
          <Category data={categoryProductList} pageCate />
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;
