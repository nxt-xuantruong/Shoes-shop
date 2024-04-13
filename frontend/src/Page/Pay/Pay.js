import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  BraintreePayPalButtons,
} from "@paypal/react-paypal-js";
import "./pay.css";
import { useEffect,useRef, useState } from "react";
import orderService from "../../services/orderService";
import orderItemService from "../../services/orderItemService";
import { deleteAllCart } from "../../Config/store/cart";
import { useNavigate } from "react-router-dom";
import customerServices from "../../services/customerServices";

const init_data = {
  name: "",
  email: "",
  phone: "",
  address: "",
  note: "",
};

let data_cart = {
  price: 0,
  quantity: 0,
};
let data = null

export default function Payment() {
  const productBuy = JSON.parse(localStorage.getItem("buyNow"));
  const User = useSelector((state) => state.oauthCustomer);
  const carts = useSelector((state) => state.cart.cart);
  const userCart = carts.filter((c) => c.userId === User.id)
  let addressRef = useRef("");
  let noteRef = useRef("");
  const [formData, setformData] = useState(init_data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState(null);
  const idUser = User.id
  function calculateTotalPrice(cart) {
  // Tính tổng tiền của các sản phẩm trong giỏ hàng
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice =
      (item.price - item.price * (item.discount / 100)) * item.quantity;
    return total + itemPrice;
  }, 0);

  return totalPrice;
}
  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          "https://react-paypal-js-storybook.fly.dev/api/braintree/generate-client-token",
          { method: "POST" }
        )
      ).json();
      setClientToken(response?.client_token || response?.clientToken);
    })();
    
  }, []);
  useEffect(() => {
    customerServices.get(idUser).then((response) => {
      if (response.data) {
        setformData({
          ...formData,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
        })
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser]);

  const handleSubmit = () => {
    data = { ...formData, address:addressRef.current,note:noteRef.current, customer: User.id, paid: 1 };
    orderService
      .create(data)
      .then((response) => {
        userCart.forEach((item) => {
          data_cart = {
            price: item.price - item.price * (item.discount / 100),
            quantity: item.quantity,
            size: item.selectedSize,
            order: response.data.id,
            product: item.id,
          };
          orderItemService.create(data_cart).then((response) => {
            console.log(response.data);
          });
        });
        alert('Đã thanh toán thành công')
        
        dispatch(deleteAllCart({ idUser }));
        navigate('/')
      })
      .catch((error) => {
        console.log(data);

        alert("Error: " + error.message);
      })
      .finally(() => {});
  };
  return (
    <div id="wrapper" className="wp-inner clearfix" style={{ width: "96%", margin: "20px auto" }}>
      {clientToken ? (
        <PayPalScriptProvider
          options={{
            clientId: "test",
            dataClientToken: clientToken,
          }}
        >
          <form method="POST" name="form-checkout" onSubmit={handleSubmit}>
            <div className="section" id="customer-info-wp">
              <div className="section-head">
                <h1 className="section-title">Thông tin khách hàng</h1>
              </div>
              <div className="section-detail">
                <div className="form-row clearfix d-flex">
                  <div className="form-col">
                    <label htmlFor="fullname">Họ và tên</label>
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      value={formData.name}
                      placeholder="Nhập họ và tên"
                      onChange={(e) =>
                        (setformData({
                          ...formData,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Nhập email"
                      id="email"
                      onChange={(e) =>
                        (setformData({
                          ...formData,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="form-row clearfix d-flex">
                  <div className="form-col">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      placeholder="Nhập số điện thoại"
                      onChange={(e) =>
                        (setformData({
                          ...formData,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  
                </div>
                <div className="form-row">
                      
                  <div className="form-col"style={{width: '100%'}} >
                    <label htmlFor="address">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      placeholder="VD: Số 49, Đường núi thành, ..."
                      id="address"
                      onChange={(e) =>
                        (addressRef.current = e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="notes">Ghi chú (không bắt buộc)</label>
                    <textarea
                      name="note"
                      className="w-100"
                      placeholder="Ghi chú đơn hàng"
                      onChange={(e) =>
                        ((noteRef.current = e.target.value))
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="section" id="order-review-wp">
              <div className="section-head">
                <h1 className="section-title">Thông tin đơn hàng</h1>
              </div>
              <div className="section-detail">
                <table className="shop-table">
                  <thead>
                    <tr>
                      <td>Sản phẩm</td>
                      <td>Tổng</td>
                    </tr>
                  </thead>
                  <tbody>
                    {productBuy ? (
                      <tr className="cart-item">
                        <td className="product-name" style={{ padding: "0" }}>
                          <img src={productBuy.thumbnail} alt={productBuy.name} width={100} height={100} />
                          <p style={{ width: "80%", float: "right", padding: "26px 0", margin: "0" }}>
                            {productBuy.name}
                            <strong className="product-quantity">
                              x Size {productBuy.selectedSize}
                            </strong>
                            <strong className="product-quantity">
                              x{productBuy.quantity}
                            </strong>
                          </p>
                        </td>
                        <td className="product-total" style={{ padding: "10px" }}>
                          {Number(
                            (productBuy.price -
                              productBuy.price * (productBuy.discount / 100)) *
                            productBuy.quantity
                          ).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    ) : (
                      userCart.map((item) => {
                        return (
                          <tr className="cart-item">
                            <td className="product-name" style={{ padding: "0" }}>
                              <img src={item.thumbnail} alt={item.name} width={100} height={100} />
                              <p style={{ width: "80%", float: "right", padding: "26px 0", margin: "0" }}>
                                {item.name}
                                <strong className="product-quantity">
                                  x Size {item.selectedSize}
                                </strong>
                                <strong className="product-quantity">
                                  x{item.quantity}
                                </strong>
                              </p>
                            </td>
                            <td className="product-total" style={{ padding: "10px" }}>
                              {Number(
                                (item.price -
                                  item.price * (item.discount / 100)) *
                                item.quantity
                              ).toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                          </tr>
                        );
                      })
                    )
                    }
                  </tbody>
                  <tfoot>
                    <tr className="order-total">
                      <td>Tổng đơn hàng:</td>
                      <td style={{ textAlign: "center" }}>
                        {productBuy ? (
                        Number(
                              (productBuy.price -
                                productBuy.price * (productBuy.discount / 100)) *
                                productBuy.quantity
                            ).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })
                        ): (
                          <strong className="total-price">
                          {calculateTotalPrice(userCart)
                            .toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                        </strong>
                        )
                        }
                        
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ padding: "20px 150px" }}>
                        <BraintreePayPalButtons 
                      createOrder={(data, actions) => {
                        return actions.braintree.createPayment({
                          flow: "checkout",
                          amount: productBuy ? (Number(
                                                  (productBuy.price -
                                                  productBuy.price * (productBuy.discount / 100)) *
                                                   productBuy.quantity
                            )*0.000043 ).toFixed(2):(calculateTotalPrice(carts)*0.000043).toFixed(2),
                          currency: "USD",
                          intent: "capture",
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.braintree
                          .tokenizePayment(data)
                          .then((payload) => {
                            handleSubmit();
                          });
                      }}
                    />
                      </td>
                    </tr>
                  </tfoot>
                  
                </table>
              </div>
            </div>
          </form>
        </PayPalScriptProvider>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}