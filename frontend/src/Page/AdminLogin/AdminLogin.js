import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminAccount = useSelector((state) => state.admin.admins);
  const navigate = useNavigate();
  const handleLogin = () => {
    const accAdmin = adminAccount.find((admin) => {
      return admin.name === userName && admin.password === password;
    });
    if (accAdmin) {
      localStorage.setItem("currentAdmin", JSON.stringify(accAdmin));
      alert("Đăng nhập thành công");
      navigate("/admin");
    } else {
      setError("tên đăng nhập hoặc mật khẩu không đúng");
    }
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
            value={userName}
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

export default AdminLogin;
