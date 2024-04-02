import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { MENU_ITEMS } from "../../components/menuItems";
import "./SidebarLayout.css";
import Footer from "../../components/Footer/Footer";

export const PriceContext = createContext();

function SidebarLayout({ children }) {
  const { name, query } = useParams();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [priceValue, setPriceValue] = useState(5000000);
  const categories = MENU_ITEMS.filter(
    (element) => name === element.to.substring(10)
  );

  const handlePriceChange = (event) => {
    const newMax = parseInt(event.target.value);
    setPriceRange({ ...priceRange, max: newMax });
  };

  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      setPriceValue(document.getElementById("price").value);
    }, 1000);
    return () => {
      clearTimeout(idSetTimeOut);
    };
  }, [priceRange]);

  return (
    <PriceContext.Provider value={priceValue}>
      <>
        <Header />
        <div className="title">
          {categories.length > 0
            ? categories[0].title.toUpperCase()
            : "Kết quả tìm kiếm cho '" + query+"'"}
        </div>
        <div className="container">
          <div className="content"> {children}</div>
          <div className="bannerCate">
            <div className="filter">
              <h3 className="titleFilter">LỌC THEO GIÁ</h3>
              <input
                type="range"
                id="price"
                min="0"
                max="5000000"
                value={priceRange.max}
                step="10000"
                onChange={handlePriceChange}
              />
              <div className="action">
                <div className="priceLabel">
                  Giá từ {priceRange.min}đ - {priceRange.max}đ
                </div>
              </div>
            </div>
            <img
              src="https://shopgiayreplica.com/wp-content/uploads/2023/07/rollbest.jpg"
              alt="banner"
            />
          </div>
        </div>
        <Footer />
      </>
    </PriceContext.Provider>
  );
}

export default SidebarLayout;
