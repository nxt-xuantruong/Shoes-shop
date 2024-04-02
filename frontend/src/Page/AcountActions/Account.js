import { Link, useNavigate, useParams } from "react-router-dom";
import { addUser } from "../../Config/store/users";

import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function Account() {
  const { type } = useParams();
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    dispatch(addUser({ name, email, phoneNumber, password }));
    navigate(-1, { replace: true });
  };

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      alert("Đăng nhập thành công");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(-1, { replace: true });
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

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
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
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
