import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string"; // Import queryString để xử lý query string

import Pagination from "../../components/Pagination/Pagination";
import ProductList from "../../components/ProductList/ProductList";

import { PriceContext } from "../../Layouts/SidebarLayout/SidebarLayout";

import productService from "../../services/productService";

function SearchResult() {
  const [data, setData] = useState([]);
  const [dataResults, setDataResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const price = useContext(PriceContext);
  const location = useLocation();
  const { query: searchQuery, page: pageNumber } = useParams();
  const resultsPerPage = 20; // Số kết quả trên mỗi trang

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search); // Parse query string từ location
    const page = parsedQuery.page || 1; // Lấy trang từ query string hoặc mặc định là 1
    productService.gets({ page }).then((response) => {
      if (response.data) {
        setData(response.data.results);
        setTotalResults(response.data.count);
      }
    });
  }, [location.search]); // Chạy lại useEffect mỗi khi query string thay đổi

  // Tính chỉ số trang hiện tại từ pageNumber hoặc mặc định là 1
  const currentPageIndex = parseInt(pageNumber) || 1;
  // Lắng nghe sự thay đổi của price và cập nhật dataResults
  useEffect(() => {
  const updatedDataResults = data.filter((result) => {
    const discountedPrice = (result.price / 100) * (100 - result.discount);
    return discountedPrice <= price;
  });
  setDataResults(updatedDataResults);
}, [data, price]); 
  return (
    <>
      <ProductList data={dataResults} />
      <Pagination
        baseURL={`/search?query=${searchQuery}&page`}
        currentPage={currentPageIndex}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
      />
    </>
  );
}

export default SearchResult;
