import { Link, useNavigate, useParams } from "react-router-dom";

import "./Account.css";
import md5 from 'js-md5';
import { useDispatch} from "react-redux";
import { useState,useEffect } from "react";
import customerServices from "../../services/customerServices";
import { loginCustomer } from "../../Config/store/oauthCustomer";


function Account() {
  const { type } = useParams();
  // const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    customerServices.gets().then((response) => {
      if (response.data) {
        setUsers(response.data.results);
      }
    });
  }, [])
  const handleSignUp = (e) => {
    customerServices.create({ name, email, phone, password })
    alert("Đã tạo tài khoản thành công")
    // dispatch(addUser({ name, email, phone, password }));
    navigate(-1, { replace: true });
  };

  const handleLogin = () => {
    const data = { email, password: md5(password) }
      dispatch(loginCustomer({users, data}));
      navigate(-1, { replace: true });
  }


  return (
    <div className="formWrapper">
      <div className="formContainer">
        <h2>{type === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
        {type === "login" ? (
          <span>
            Nếu bạn chưa có tài khoản,{" "}
            <Link to="/user/signup">đăng ký tại đây</Link>
          </span>
        ) : (
          <span>
            Nếu bạn đã có tài khoản,{" "}
            <Link to="/user/login">đăng nhập tại đây</Link>
          </span>
        )}
        {error && <p className="error">{error}</p>}
        <form className="form">
          {type === "signup" && (
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {type === "signup" && (
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          )}
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <button
          type="submit"
          className="btnSubmit"
          onClick={type === "signup" ? handleSignUp : handleLogin}
        >
          {type === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </div>
    </div>
  );
}

export default Account;
