import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div className="Cart">
      <Link to="/cart">
        <FontAwesomeIcon icon={faCartShopping} />
      </Link>
    </div>
  );
}

export default Cart;
