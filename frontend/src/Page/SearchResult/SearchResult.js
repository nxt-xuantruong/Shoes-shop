import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import ProductList from "../../components/ProductList/ProductList";

import { PriceContext } from "../../Layouts/SidebarLayout/SidebarLayout";
import productService from "../../services/productService";

function SearchResult() {
  const [data, setData] = useState([])
  const price = useContext(PriceContext);
  const { query } = useParams();
  const resultsPerPage = 20; // Số kết quả trên mỗi trang
  const queryResult = data.filter((element) => {
    return element.name.toLowerCase().includes(query.toLowerCase());
  });
  useEffect(() => {
    productService.gets().then((response) => {
      if (response.data) {
        setData(response.data.results);
      }
    });
  },[])

  // Lấy chỉ số của trang hiện tại từ URL (nếu có)
  const currentPageIndex = parseInt(useParams().pageNumber) || 1;

  // Tính chỉ số bắt đầu và kết thúc của dữ liệu trên trang hiện tại
  const startIndex = (currentPageIndex - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  // Lấy dữ liệu của trang hiện tại dựa trên chỉ số bắt đầu và kết thúc
  const currentResults = queryResult
    .slice(startIndex, endIndex)
    .filter((result) => result.price <= price);

  return (
    <>
      <ProductList data={currentResults} />
      <Pagination
        totalResults={queryResult.length}
        resultsPerPage={resultsPerPage}
        currentPage={currentPageIndex}
        lastPage={Math.ceil(queryResult.length / resultsPerPage)}
      />
    </>
  );
}

export default SearchResult;
