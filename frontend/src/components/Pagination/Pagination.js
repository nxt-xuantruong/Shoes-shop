import { Link, useParams } from "react-router-dom";
import "./Pagination.css";

function Pagination({ totalResults, resultsPerPage }) {
  const { query, pageNumber } = useParams();
  const currentPage = parseInt(pageNumber);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const pages = [];
  const maxVisiblePages = 5; // Số trang tối đa hiển thị trước hoặc sau trang hiện tại
  const sidePages = Math.floor((maxVisiblePages - 1) / 2); // Số trang hiển thị ở mỗi bên trước và sau trang hiện tại

  // Tính toán khoảng trang cần hiển thị trước trang hiện tại
  let startPage = currentPage - sidePages;
  startPage = Math.max(1, startPage); // Đảm bảo startPage không nhỏ hơn 1
  let endPage = startPage + maxVisiblePages - 1;
  endPage = Math.min(totalPages, endPage); // Đảm bảo endPage không lớn hơn totalPages

  // Tính toán trang đầu tiên và trang cuối cùng
  const firstPage = 1;
  const lastPage = totalPages;

  // Nút "Previous"
  if (currentPage > 1) {
    pages.push(
      <Link key="previous" to={`/search/${query}/page/${currentPage - 1}`}>
        <button className="btnPage">Previous</button>
      </Link>
    );
  }

  // Nút cho trang đầu tiên
  if (startPage > firstPage) {
    pages.push(
      <Link key={firstPage} to={`/search/${query}/page/${firstPage}`}>
        <button className="btnPage">{firstPage}</button>
      </Link>
    );
    if (startPage > firstPage + 1) {
      pages.push(<span key="ellipsis-1">...</span>);
    }
  }

  // Các trang nằm trong khoảng được hiển thị
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Link key={i} to={`/search/${query}/page/${i}`}>
        <button className={`btnPage ${currentPage === i ? "active" : ""}`}>
          {i}
        </button>
      </Link>
    );
  }

  // Nút cho trang cuối cùng
  if (endPage < lastPage) {
    if (endPage < lastPage - 1) {
      pages.push(<span key="ellipsis-2">...</span>);
    }
    pages.push(
      <Link key={lastPage} to={`/search/${query}/page/${lastPage}`}>
        <button className="btnPage">{lastPage}</button>
      </Link>
    );
  }

  // Nút "Next"
  if (currentPage < totalPages) {
    pages.push(
      <Link key="next" to={`/search/${query}/page/${currentPage + 1}`}>
        <button className="btnPage">Next</button>
      </Link>
    );
  }

  return <div className="pagination">{pages}</div>;
}

export default Pagination;
