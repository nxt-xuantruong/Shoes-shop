import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import oauthServices from '../../../services/oauthServices'
import { logOut } from "../../../Config/store/oauth";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameUser = useSelector((state) => state.oauthAdmin.name);

  const handleLogout = (e) => {
    e.preventDefault();
    oauthServices
      .logout()
      .then((response) => {
          console.log("logout success");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(logOut());
        navigate("/admin/" , {replace: true});
      });
  };

  return (
    <nav
      className="topnav shadow navbar-light bg-white d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <div className="navbar-brand">
        <a href="?">ROLL SNEAKER ADMIN</a>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {nameUser}

        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Thoát 
            </button>
          </li>
        </ul>
      </div>      
      
    </nav>
  );
}