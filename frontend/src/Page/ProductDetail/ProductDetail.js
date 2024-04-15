import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  faCircleCheck,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addCart, editCart } from "../../Config/store/cart";

import "./ProductDetail.css";
import productService from "../../services/productService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({})
  const [LinkImg, setLinkImg] = useState('');
  const [imgs, setImgs] = useState([])
  const cartItems = useSelector((state) => state.cart.cart);
  const currentUser = useSelector(state => state.oauthCustomer);
  useEffect(() => {
      productService.get(id).then((response) => {
        if (response.data) {
          setData({ ...response.data });
          setLinkImg(response.data.images[0].image)
          setImgs(response.data.images)
        }
      });
  }, [id]);
  const [selectedSize, setSelectedSize] = useState("");

  const handleImgSlideClick = (e) => {
    const clickedImage = e.currentTarget.querySelector("img").src;
    setLinkImg(clickedImage);

    document.querySelectorAll(".imgSlide").forEach((item) => {
      item.classList.remove("active");
    });

    e.currentTarget.classList.add("active");
  };

  const handleSlide = (event) => {
    const active = document.querySelector(".imgSlide.active");
    if (event.target.classList.contains("btnPrev")) {
      let preElement =
        active.previousElementSibling ||
        document.querySelector(".imgSlide:last-child");

      setLinkImg(preElement.querySelector("img").src);

      active.classList.remove("active");

      preElement.classList.add("active");
    } else {
      let nextElement =
        active.nextElementSibling ||
        document.querySelector(".imgSlide:first-child");

      setLinkImg(nextElement.querySelector("img").src);

      active.classList.remove("active");

      nextElement.classList.add("active");
    }
  };

  const handlePriceSale = (product) => {
    return (product.price / 100) * (100 - product.discount);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    document
      .querySelector(`option[value="${event.target.value}"]`)
      .classList.add("active");
    const prevSizeOption = document.querySelector(
      `option[value="${selectedSize}"]`
    );
    if (prevSizeOption) {
      prevSizeOption.classList.remove("active");
    }
  };

  const handleAddtoCart = (product) => {
    if (!selectedSize) {
      return;
    } else {
      if (currentUser.id === "") {
        navigate("/user/login");
      } else {
        let found = false;

        const updatedCartItems = cartItems.map((item) => {
          if (
            item.name === product.name &&
            item.selectedSize === selectedSize &&
            item.userId === currentUser.id
          ) {
            found = true;
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        if (!found) {
          const newProduct = {
            ...product,
            selectedSize,
            userId: currentUser.id,
            quantity: 1,
          };
          dispatch(addCart(newProduct));
        } else {
          // Dispatch action to update cart items with the new array
          dispatch(editCart(updatedCartItems));
        }
        navigate("/cart");
      }
    }
  };

  const handleBuyNow = (product) => {
    if (currentUser.id === "") {
      navigate("/user/login")
    } else {
      const newProduct = {
        ...product,
        selectedSize,
        quantity: 1,
      };
      localStorage.setItem("buyNow", JSON.stringify(newProduct));
      navigate("/pay");
    }
  };

  return (
    <div className="mainContent">
      <div className="infoProduct">
        <div className="slideImg">
          <img className="imgMain" src={LinkImg} alt={data.name} />
          <ul className="imgDescSlide">
            {imgs.map((item, index) => {
              return (
                <li
                  key={index}
                  className="imgSlide"
                  onClick={(e) => {
                    handleImgSlideClick(e);
                  }}
                >
                  <img src={item.image} alt="img" />
                </li>
              );
            })}
          </ul>
          <button className="btnPrev" onClick={handleSlide}>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button className="btnNext" onClick={handleSlide}>
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
        <div className="Info">
          <h2 className="nameProduct">{data.name}</h2>
          <div className="price">
            <p className="priceSale">{Number(handlePriceSale(data)).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}</p>
            <p className="priceOriginal">
              {Number(data.price).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
            </p>
          </div>
          <div className="size">
            <span className="label">SIZE</span>
            <section className="sizeValue">
              {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47].map((size) => (
                <option
                  key={size}
                  value={size}
                  className={size === selectedSize ? "active" : ""}
                  onClick={handleSizeChange}
                >
                  {size}
                </option>
              ))}
            </section>
          </div>
          <div className="btn">
            <button
              disabled={!selectedSize && true}
              onClick={() => handleAddtoCart(data)}
              className="btnAddToCart"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              disabled={!selectedSize && true}
              className="btnPay"
              onClick={() => handleBuyNow(data)}
            >
              Mua ngay
            </button>
          </div>
          <ul className="saleShop">
            <li>
              🔥 <span>BLACK FRIDAY</span> 🔥{" "}
              <b> SIÊU SALE BOM TẤN (CHỈ 10 NGÀY)</b>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Sale
              toàn bộ cửa hàng <b>upto 70%</b>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} />
              Cơ hội bốc thăm nhận <b>IPHONE 15 pro</b> với giá <b>0đ</b>
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Giao
              hàng nhanh 60 phút trong nội thành Hà Nội và tp Hcm
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Nhận
              hàng và kiểm tra trước khi thanh toán.
            </li>
            <li>
              <FontAwesomeIcon className="iconLi" icon={faCircleCheck} /> Hỗ Trợ
              đổi trả size linh hoạt
            </li>
          </ul>

        </div>
      </div>
      <div className="description">
        <h2>Mô tả</h2>
        <div className="textDesc">{data.description}</div>
        <div className="imgDesc">
          {imgs.map((item, index) => {
            return <img key={index} alt="img-desc" src={item.image} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;