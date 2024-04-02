import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Menu.css";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

import { MENU_ITEMS } from "../menuItems";
import { Link } from "react-router-dom";

const renderItems = () => {
  return MENU_ITEMS.map((item, index) => {
    return (
      <li key={index} className="menu">
        <Link to={item.to}>
          {item.title}{" "}
          {item.isSubMenu && <FontAwesomeIcon icon={faChevronDown} />}
        </Link>
        {item.children && (
          <ul className="subMenu">
            {item.children.data.map((child, index) => {
              return (
                <li key={index}>
                  <Link to={child.to}>
                    <h3>
                      {child.title}{" "}
                      {child.isSubMenu && (
                        <FontAwesomeIcon
                          className="flRight"
                          icon={faChevronRight}
                        />
                      )}
                    </h3>
                    {child.children && (
                      <ul className="subMenuRight">
                        {child.children.data.map((childItem, index) => {
                          return (
                            <li key={index}>
                              <h3>{childItem.title}</h3>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  });
};

function Menu() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 94) {
        document.querySelector(".Wrapper").classList.add("sticky");
      } else {
        document.querySelector(".Wrapper").classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
  });
  return <ul className="Wrapper">{renderItems()}</ul>;
}

export default Menu;
