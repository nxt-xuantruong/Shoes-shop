import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import orderService from "../../services/orderService";
import orderItemService from "../../services/orderItemService";

export default function UserOrder() {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
//   const [categories, setCategories] = useState([]);
    const currentUser = useSelector((state) => state.oauthCustomer)
    const userOder = orders.filter(order => order.customer === currentUser.id)
  useEffect(() => {
    orderService.gets().then((response) => {
      if (response.data) {
        setOrders(response.data.results);
      }
    });
    orderItemService.gets().then((response) => {
      if (response.data) {
        setOrderItems(response.data.results);
      }
    });
  }, []);


//   const handleDelete = (id) => {
//     productService.delete(id);
//     setProduct((pre) => pre.filter((product) => product.id !== id));
    //   };
    const totalPrice = (orderId) => {
        let total =0
        orderItems.forEach((item) => {
            if (item.order=== orderId) {
                total = total + item.price * item.quantity
            }
        })
        return total
    }
  return (
    <div id="content" className="container-fluid" style={{width:'60%'}}>
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Danh sách đơn hàng</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-checkall">
            <thead>
              <tr>
                <th scope="col">STT</th>
                {/* <th scope="col">Khách hàng</th>
                <th scope="col">SDT</th>
                <th scope="col">Địa chỉ</th> */}
                <th scope="col">Date</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Đã thanh toán</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {userOder.length > 0 ? (
                userOder.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index +1}</td>
                      {/* <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td> */}
                      <td>{item.date}</td>
                      <td>
                            {Number(totalPrice(item.id)).toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                            })}
                      </td>
                      <td>
                        {
                            item.paid === true ?
                                <FontAwesomeIcon icon={faCheck} />
                                    :
                                <FontAwesomeIcon icon={faXmark}/>
                        }
                          </td>
                          <td>{
                              <Link to={`/user/order/${item.id}/`}>
                                 <button type="button" class="btn btn-outline-success">
                                    <FontAwesomeIcon icon={faEye} />
                                    Xem chi tiết
                                 </button>
                              </Link>

                          }</td>
                          
                    </tr>
                  );
                })
              ) : (
                <h5 style={{ color: "red", marginTop: "10px" }}>
                  Không có đơn hàng
                </h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}