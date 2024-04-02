import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(["user", "list"]);

  const handleClick = (active, activeChild = "") => {
    setActiveItem([active, activeChild]);
  };

  return (
    <div id="sidebar" className="bg-white">
      <ul id="sidebar-menu">
        <li
          className={`nav-link ${activeItem[0] === "user" ? "active" : ""}`}
          onClick={() => handleClick("user")}
        >
          <Link to="/admin/user">
            <div className="nav-link-icon d-inline-flex">
              <i className="far fa-folder"></i>
            </div>
            Users
          </Link>
        </li>
        <li
          className={`nav-link ${activeItem[0] === "product" ? "active" : ""}`}
          onClick={() => handleClick("product", "list")}
        >
          <Link
            to="/admin/products/"
            style={{ position: "relative", display: "block" }}
          >
            <div className="nav-link-icon d-inline-flex">
              <i className="far fa-folder"></i>
            </div>
            Product
            <i
              class="fa-solid fa-chevron-right"
              style={{
                position: "absolute",
                top: "50%",
                transform:
                  activeItem[0] === "product"
                    ? "translateY(-50%) rotate(90deg)"
                    : "translateY(-50%)",
                transition: "all 0.3s",
                right: "0",
              }}
            ></i>
          </Link>
          <ul
            style={{
              marginLeft: "15px",
              paddingLeft: "15px",
              borderLeft: "1px solid #333",
              display: activeItem[0] === "product" ? "block" : "none",
            }}
          >
            <li
              className={`nav-link ${activeItem[1] === "list" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("product", "list");
              }}
            >
              <Link to="/admin/products/">danh sách sản phẩm</Link>
            </li>
            <li
              className={`nav-link ${activeItem[1] === "add" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("product", "add");
              }}
            >
              <Link to="/admin/products/new">Thêm sản phẩm</Link>
            </li>
          </ul>
        </li>
        <li
          className={`nav-link ${activeItem[0] === "categoryProduct" ? "active" : ""}`}
          onClick={() => handleClick("categoryProduct", "list")}
        >
          <Link
            to="/admin/categories/"
            style={{ position: "relative", display: "block" }}
          >
            <div className="nav-link-icon d-inline-flex">
              <i className="far fa-folder"></i>
            </div>
            Category product
            <i
              class="fa-solid fa-chevron-right"
              style={{
                position: "absolute",
                top: "50%",
                transform:
                  activeItem[0] === "categoryProduct"
                    ? "translateY(-50%) rotate(90deg)"
                    : "translateY(-50%)",
                transition: "all 0.3s",
                right: "0",
              }}
            ></i>
          </Link>
          <ul
            style={{
              marginLeft: "15px",
              paddingLeft: "15px",
              borderLeft: "1px solid #333",
              display: activeItem[0] === "categoryProduct" ? "block" : "none",
            }}
          >
            <li
              className={`nav-link ${activeItem[1] === "list" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("categoryProduct", "list");
              }}
            >
              <Link to="/admin/categories/">danh sách danh mục</Link>
            </li>
            <li
              className={`nav-link ${activeItem[1] === "add" ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("categoryProduct", "add");
              }}
            >
              <Link to="/admin/categories/new">Thêm danh mục</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}