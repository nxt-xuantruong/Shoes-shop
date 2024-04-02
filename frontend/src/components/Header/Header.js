import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Search from "../Search/Search";
import Cart from "../Cart/Cart";

import "./Header.css";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
function Header() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <header className="header">
      <div className="headerWrapper">
        <Link to="/" className="logo">
          <img
            src="https://shopgiayreplica.com/wp-content/uploads/2023/06/cropped-logo-roll-sneaker.png"
            alt="Logo"
          />
        </Link>
        <Search />
        {currentUser !== null ? (
          <div className="userAction">
            <FontAwesomeIcon icon={faUser} />
            <span>{currentUser.name}</span>
            <ul className="menuUser">
                <Link to='/account'>
                  <li>
                      Thông tin tài khoản
                  </li>
                </Link>
                <Link to='/orders'>
                  <li>
                        Đơn mua
                  </li>
                </Link>
              <li onClick={handleLogOut}>
                Đăng xuất
              </li>
            </ul>
          </div>
        ) : (
          <div className="userAction">
            <FontAwesomeIcon icon={faUser} />
            <Link to="/user/login">Đăng nhập</Link> /
            <Link to="/user/signup">Đăng ký</Link>
          </div>
        )}
        <Cart />
      </div>
      <Menu />
    </header>
  );
}

export default Header;
