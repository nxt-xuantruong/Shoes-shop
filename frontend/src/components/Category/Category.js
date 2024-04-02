import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import ProductList from "../ProductList/ProductList";

import { PriceContext } from "../../Layouts/SidebarLayout/SidebarLayout";

import "./Category.css";

function Category({ data, pageCate }) {
  const obj = useSelector((state) => state.products.products);
  const [tab, setTab] = useState(!pageCate && data.children[0]);
  const [dataTab, setDataTab] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const price = useContext(PriceContext);
  useEffect(() => {
    if (!pageCate) {
      let result = obj.filter((item) => item.slug === tab.toUpperCase());
      setDataTab(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  useEffect(() => {
    let result = obj.filter(
      (item) => item.slug === data.title.toUpperCase() && item.price <= price
    );
    if (result.length > 8) {
      setDataCate(result.slice(0, 8));
      setLoadMore(true);
    } else if (result.length === 0) {
      setDataCate([])
    }
    else {
      setDataCate(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.title, price]);
  const handleLoadMore = () => {
    let filteredResult = obj.filter(
      (item) => item.slug === data.title.toUpperCase() && item.price <= price
    );

    if (loadMore) {
      setDataCate(filteredResult);
      setLoadMore(false);
    } else {
      setDataCate(filteredResult.slice(0, 8));
      setLoadMore(true);
    }
  };
  return (
    <div className="category">
      <h2 className="categoryName">{data.title}</h2>

      {!pageCate && (
        <div className="nav">
          {data.children.map((child, index) => (
            <button
              key={index}
              className={`btnNav ${tab === child ? "active" : ""}`}
              onClick={() => setTab(child)}
            >
              {child}
            </button>
          ))}
        </div>
      )}

      <div className="productList">
        {!pageCate &&
          data.children.map((child, index) => (
            <div
              key={index}
              className={`product ${tab === child ? "active" : ""}`}
            >
              {tab === child && <ProductList data={dataTab} />}
            </div>
          ))}
        {pageCate && dataCate.length===0 ? <p>Không có sản phẩm nào</p> : <ProductList data={dataCate} />}
      </div>

      {dataCate.length < 3 ? null : (
        <button className="btnLoadMore" onClick={handleLoadMore}>
          {loadMore ? "Xem thêm" : "Thu gọn"}
        </button>
      )}
    </div>
  );
}

export default Category;
