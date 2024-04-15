import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import productService from "../../../services/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import categoryService from "../../../services/categoryService";

export default function List() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Số sản phẩm trên mỗi trang
  const location = useLocation();

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
    loadProducts();
  }, [currentPage]);

  useEffect(() => {
    categoryService.gets({ full_data: true }).then((response) => {
      if (response.data) {
        setCategories(response.data);
      }
    });
  },[])
  const loadProducts = () => {
    productService.gets({ page: currentPage }).then((response) => {
      if (response.data) {
        setProducts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / resultsPerPage));
      }
    });
  };

  const handleDelete = (id) => {
    productService.delete(id).then(() => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    });
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
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá sản phẩm</th>
                <th scope="col">Danh mục sản phẩm</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.thumbnail} alt="ảnh" width={100} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{categories.find(c => c.id === product.category_id)?.name}</td>
                    <td>{product.date}</td>
                    <td>
                      <div className="d-flex">
                        <Link
                          className="btn btn-success btn-sm rounded-0 text-white"
                          to={`${product.id}/`}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          onClick={() =>
                            window.confirm(
                              "Bạn có chắc chắn xóa bản ghi này"
                            ) && handleDelete(product.id)
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
                  <td colSpan="6" style={{ color: "red", textAlign: "center" }}>
                    Không có sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            totalResults={totalPages * resultsPerPage}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            baseURL="/admin/products"
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
