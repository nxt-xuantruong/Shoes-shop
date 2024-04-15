import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import orderService from "../../../services/orderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Số đơn hàng trên mỗi trang

  useEffect(() => {
    loadOrders();
  }, [currentPage]);

  const loadOrders = () => {
    orderService.gets({ page: currentPage }).then((response) => {
      if (response.data) {
        setOrders(response.data.results);
        setTotalPages(Math.ceil(response.data.count / resultsPerPage));
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Danh sách đơn hàng</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-checkall">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Khách hàng</th>
                <th scope="col">SDT</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Date</th>
                <th scope="col">Đã thanh toán</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.date}</td>
                      <td>
                        {item.paid ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} />
                        )}
                      </td>
                      <td>
                        <Link to={`/admin/order/${item.id}/`}>
                          <button type="button" className="btn btn-outline-success">
                            <FontAwesomeIcon icon={faEye} />
                            Xem chi tiết
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" style={{ color: "red", textAlign: "center" }}>
                    Không có đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            totalResults={totalPages * resultsPerPage}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            baseURL="/api/orders"
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
