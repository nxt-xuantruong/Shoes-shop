import { useState, useEffect, useContext } from "react";

import ProductList from "../ProductList/ProductList";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import { PriceContext } from "../../Layouts/SidebarLayout/SidebarLayout";

import "./Category.css";

function Category({ data, pageCate }) {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tab, setTab] = useState(!pageCate && data.children[0]); // Lưu trữ tab mặc định
  const [dataTab, setDataTab] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const price = useContext(PriceContext);

  useEffect(() => {
    productService.gets().then((response) => {
      if (response.data) {
        setProduct(response.data.results);
      }
    });
    categoryService.gets().then((response) => {
      if (response.data) {
        setCategories(response.data.results);
      }
    });
  }, []);

  useEffect(() => {
    // Lọc dữ liệu sản phẩm cho tab mặc định
    if (!pageCate) {
      let result = product.filter((item) => 
        categories.find(c => c.id === item.category_id)?.name.toUpperCase() === tab.toUpperCase()
      );
      setDataTab(result);
    }
  }, [tab,categories,pageCate,product]);

  useEffect(() => {
    // Lọc dữ liệu sản phẩm cho tab mặc định khi component được tạo
    if (!pageCate) {
      let result = product.filter((item) => 
        categories.find(c => c.id === item.category_id)?.name.toUpperCase() === tab.toUpperCase()
      );
      setDataTab(result);
    } else {
      // Lọc dữ liệu sản phẩm cho tab mặc định khi pageCate được kích hoạt
      let result = product.filter(
        (item) => categories.find(c => c.id === item.category_id)?.name.toUpperCase() === data.title.toUpperCase() && item.price <= price
      );
      setDataCate(result);
    }
  }, [categories, data.title, pageCate, price, product, tab]);

  const handleLoadMore = () => {
    let filteredResult = product.filter(
      (item) => categories.find(c => c.id === item.category_id)?.name.toUpperCase() === data.title.toUpperCase() && item.price <= price
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
