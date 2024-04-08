import { Link } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ data }) {
  const handlePriceSale = (sale) => {
    return (data.price / 100) * (100 - sale);
  };
  return (
    <Link to={"/product/" + data.id}>
      <div className="cardP">
        <img src={data.img_thumbnail} alt={data.name} />
        {data.sale !== 0 && <span className="sale">-{data.sale}%</span>}
        <div className="cardInfo">
          <h3 className="cardName">{data.name}</h3>
          {typeof data.price === "number" ? (
            <p>
              <p className="price">{Number(data.price).toLocaleString("vi", {
                                                        style: "currency",
                                                        currency: "VND",
                                                      })}
              </p>
              <p className="priceSale">
                {
                  Number(handlePriceSale(data.sale)).toLocaleString("vi", {
                                                                  style: "currency",
                                                                  currency: "VND",
                                                                })
                }
              </p>
            </p>
          ) : (
            <p className="priceSale">{data.price}</p>
          )}
        </div>
        {!data.stock && <span className="stock">Hết hàng</span>}
        
      </div>
    </Link>
  );
}

export default ProductItem;
