import { Link } from "react-router-dom";
import "./Pagination.css";

function Pagination({ totalResults, resultsPerPage, currentPage, baseURL }) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const maxVisiblePages = 5; // Số trang tối đa hiển thị trước hoặc sau trang hiện tại
  const sidePages = Math.floor((maxVisiblePages - 1) / 2); // Số trang hiển thị ở mỗi bên trước và sau trang hiện tại

  // Tính toán khoảng trang cần hiển thị trước trang hiện tại
  let startPage = currentPage - sidePages;
  startPage = Math.max(1, startPage); // Đảm bảo startPage không nhỏ hơn 1
  let endPage = startPage + maxVisiblePages - 1;
  endPage = Math.min(totalPages, endPage); // Đảm bảo endPage không lớn hơn totalPages

  // // Tính toán trang đầu tiên và trang cuối cùng
  // const firstPage = 1;
  // const lastPage = totalPages;

  // Nút "Previous"
  const prevPage = Math.max(1, currentPage - 1);
  const prevPageURL = `${baseURL}?page=${prevPage}`;
  const prevButton = (
    <Link to={prevPageURL}>
      <button className="btnPage">Previous</button>
    </Link>
  );

  // Nút "Next"
  const nextPage = Math.min(totalPages, currentPage + 1);
  const nextPageURL = `${baseURL}?page=${nextPage}`;
  const nextButton = (
    <Link to={nextPageURL}>
      <button className="btnPage">Next</button>
    </Link>
  );

  // Các trang nằm trong khoảng được hiển thị
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    const pageURL = `${baseURL}?page=${i}`;
    const pageButton = (
      <Link key={i} to={pageURL}>
        <button className={`btnPage ${currentPage === i ? "active" : ""}`}>
          {i}
        </button>
      </Link>
    );
    pages.push(pageButton);
  }

  return (
    <div className="pagination">
      {prevButton}
      {pages}
      {nextButton}
    </div>
  );
}

export default Pagination;
