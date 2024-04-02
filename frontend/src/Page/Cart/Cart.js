import { useDispatch, useSelector } from "react-redux";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteCart } from "../../Config/store/cart";

import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userCart = currentUser
    ? cart.filter((item) => item.userId === currentUser.id)
    : [];

  const dispatch = useDispatch();

  const removeFromCart = (id, size) => {
    dispatch(deleteCart({ id, size }));
  };

  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < userCart.length; i++) {
      total += handlePriceSale(userCart[i]) * userCart[i].quantity; // Nhân giá của sản phẩm với số lượng tương ứng
    }
    return total;
  };
  const handlePriceSale = (product) => {
    return (product.price / 100) * (100 - product.sale);
  };
  return (
    <div className="cart">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th className="thImg">Image</th>
            <th>Sản Phẩm</th>
            <th>Size</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tạm tính</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {userCart.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.img_thumbnail} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.selectedSize}</td>
                <td>{handlePriceSale(item)}</td>
                <td>{item.quantity}</td>
                <td>{handlePriceSale(item) * item.quantity}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                  />
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={6}>Tổng giá:</td>
            <td colSpan={2}>{totalPrice()}</td>
          </tr>
        </tbody>
      </table>
      {userCart.length > 0 && (
        <button>
          <Link to="/pay">Thanh toán</Link>
        </button>
      )}
    </div>
  );
}

export default Cart;
