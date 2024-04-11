import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";

import "./Header.css";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { logoutCustomer } from "../../Config/store/oauthCustomer";

function Header() {

  const currentUser=useSelector((state) => state.oauthCustomer)
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutCustomer())
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
        {currentUser.user !== "" ? (
          <div className="userAction">
            <FontAwesomeIcon icon={faUser} />
            <span>{currentUser.user}</span>
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
