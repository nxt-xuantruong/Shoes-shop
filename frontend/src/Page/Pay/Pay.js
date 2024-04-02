import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pay.css";
import { addOrder } from "../../Config/store/orders";
import { useNavigate } from "react-router-dom";
import { deleteAllCart } from "../../Config/store/cart";

function Pay() {
  const productBuy = JSON.parse(localStorage.getItem("buyNow"));
  const cart = useSelector((state) => state.cart.cart);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userCart = cart.filter((item) => item.userId === currentUser.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    orderNote: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetails = {
      customerInfo: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      },
      orderNote: formData.orderNote,
      orderProduct: productBuy ? productBuy : userCart,
      orderTotal: productBuy ? handlePrice() + 30000 : totalPrice() + 30000,
    };

    dispatch(addOrder(orderDetails));

    userCart.forEach((item) => {
      dispatch(deleteAllCart(item.id));
    });

    setFormData({
      fullName: "",
      phoneNumber: "",
      address: "",
      orderNote: "",
    });
    alert("đăt hàng thành công");
    navigate("/");
  };

  const handlePrice = () => {
    return (
      (productBuy.price / 100) * (100 - productBuy.sale) * productBuy.quantity
    );
  };
  useEffect(() => {
    return () => {
      localStorage.removeItem("buyNow");
    };
  }, []);
  const handlePriceSale = (product) => {
    return (product.price / 100) * (100 - product.sale);
  };
  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < userCart.length; i++) {
      total += handlePriceSale(userCart[i]) * userCart[i].quantity;
    }
    return total;
  };
  return (
    <div className="payContainer">
      <form className="checkout" onSubmit={handleSubmit}>
        <h2>Thanh toán và giao hàng</h2>
        <div className="row">
          <div>
            <label>Họ và tên</label>
            <input
              type="text"
              placeholder="Họ và tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label>Địa chỉ</label>
          <input
            type="text"
            placeholder="Địa chỉ"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <h3>Thông tin bổ sung</h3>
        <div>
          <label>Ghi chú đơn hàng(tùy chọn)</label>
          <textarea
            placeholder="chỉ dẫn giao hàng,..."
            rows={4}
            name="note"
            value={formData.orderNote}
            onChange={handleInputChange}
          />
        </div>
        <h2>Đơn hàng của bạn</h2>
        <div className="bill">
          {productBuy ? (
            <div className="productBuy">
              <img src={productBuy.img_thumbnail} alt="img" />
              <p>
                {productBuy.name +
                  " " +
                  productBuy.selectedSize +
                  "x" +
                  productBuy.quantity}
              </p>
              <p>{handlePrice()}đ</p>
            </div>
          ) : (
            userCart.map((item, index) => {
              return (
                <div key={index} className="productBuy">
                  <img src={item.img_thumbnail} alt="img" />
                  <p>
                    {item.name + " " + item.selectedSize + "x" + item.quantity}
                  </p>
                  <p>{handlePriceSale(item) * item.quantity}đ</p>
                </div>
              );
            })
          )}
          <div>
            <p>Tạm tính</p>
            <p>{productBuy ? handlePrice() : totalPrice()}</p>
          </div>
          <div>
            <p>Giao hàng</p>
            <p>30000đ</p>
          </div>
          <div>
            <p>Tổng</p>
            <p>{productBuy ? handlePrice() + 30000 : totalPrice() + 30000}đ</p>
          </div>
        </div>
        <button type="submit" className="btnOrder">
          Đặt hàng
        </button>
      </form>
    </div>
  );
}

export default Pay;
