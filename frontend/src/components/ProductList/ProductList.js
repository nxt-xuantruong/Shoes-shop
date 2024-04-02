import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";

function ProductList({ data }) {
  return (
    <div className="list">
      {data.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      })}
    </div>
  );
}

export default ProductList;
