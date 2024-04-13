import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import oauthServices from "../../../services/oauthServices"
import { updateOauthInfo } from "../../../Config/store/oauth";
import { loginAdmin } from "../../../Config/store/oauthAdmin";

function LoginAdmin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const adminAccount = useSelector((state) => state.admin.admins);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    oauthServices
      .login({ username, password })
      .then((response) => {
        if (response && response.data) {
          dispatch(updateOauthInfo(response.data));
          dispatch(loginAdmin({ name:username}))
          navigate("/admin/user");
        }
      })
      .catch((err) => console.log(err));
    // const accAdmin = adminAccount.find((admin) => {
    //   return admin.name === userName && admin.password === password;
    // });
    // if (accAdmin) {
    //   localStorage.setItem("currentAdmin", JSON.stringify(accAdmin));
    //   alert("Đăng nhập thành công");
    //   navigate("/admin");
    // } else {
    //   setError("tên đăng nhập hoặc mật khẩu không đúng");
    // }
  };

  return (
    <div className="formWrapper">
      <div className="formContainer">
        <h2>Đăng Nhập</h2>
        {error && <p className="error">{error}</p>}
        <form className="form">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <button type="submit" className="btnSubmit" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default LoginAdmin;
