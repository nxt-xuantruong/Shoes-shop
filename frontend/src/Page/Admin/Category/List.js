import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import categoryService from "../../../services/categoryService";

import Pagination from "../../../components/Pagination/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ListCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryAll, setCategoryAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const resultsPerPage = 10; // Số lượng danh mục trên mỗi trang
  const location = useLocation(); // Sử dụng useLocation để lấy thông tin đường dẫn URL

  useEffect(() => {
    // Kiểm tra nếu không có tham số page trong URL, thiết lập trang mặc định là 1
    if (!location.search.includes("page")) {
      setCurrentPage(1);
    } else {
      const page = new URLSearchParams(location.search).get("page");
      setCurrentPage(Number(page));
    }
  }, [location]); // Chạy mỗi khi đường dẫn URL thay đổi

  useEffect(() => {
    categoryService.gets({ full_data:true }).then((response) => {
      if (response.data) {
        setCategoryAll(response.data);
      }
    });
  },[])

  useEffect(() => {
    loadCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Gọi loadCategories mỗi khi currentPage thay đổi

  const loadCategories = () => {
    // const offset = (currentPage - 1) * resultsPerPage;
    categoryService.gets({ page: currentPage }).then((response) => {
      if (response.data) {
        setCategories(response.data.results);
        setTotalCategories(response.data.count);
      }
    });
  };

  const handleDelete = (id) => {
    categoryService.delete(id);
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Danh sách sản phẩm</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-checkall">
            <thead>
              <tr>
                <th scope="col">Tên danh mục</th>
                <th scope="col">Tên danh mục cha</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      {categoryAll.find((it) => it.id === category.parent_id)?.name || ""}
                    </td>
                    <td>{category.date}</td>
                    <td>
                      <div className="d-flex">
                        <Link
                          className="btn btn-success btn-sm rounded-0 text-white"
                          to={category.id + "/"}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          onClick={() =>
                            window.confirm(
                              "Bạn có chắc chắn xóa bản ghi này"
                            ) && handleDelete(category.id)
                          }
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ color: "red", textAlign: "center" }}>
                    Không có danh mục
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalResults={totalCategories}
          resultsPerPage={resultsPerPage}
          currentPage={currentPage}
          baseURL="/admin/categories" // Thay đổi baseURL tùy thuộc vào đường dẫn của bạn
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
