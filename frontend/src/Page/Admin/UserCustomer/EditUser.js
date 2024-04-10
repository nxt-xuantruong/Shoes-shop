
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { updateUser } from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";

export default function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const list = users.filter((item) => item.id === id);

  const [formData, setFormData] = useState({
    name: list[0].name,
    email: list[0].email,
    id: id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUser(formData));
    navigate("/admin/user");
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Edit khách hàng</h5>
        </div>
        <div className="card-body">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group row">
              <label
                for="name"
                className="col-md-4 col-form-label text-md-right font-weight-bold"
                style={{ color: "black" }}
              >
                Tên đăng nhập
              </label>

              <div className="col-md-6">
                <input
                  id="name"
                  type="name"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label
                for="email"
                className="col-md-4 col-form-label text-md-right"
                style={{ color: "black" }}
              >
                Email
              </label>

              <div className="col-md-6">
                <input
                  id="email"
                  type="email"
                  className="form-control "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="form-group row mb-0 mt-3"
              style={{ justifyContent: "center" }}
            >
              <div>
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </div>
            {/* {authError && <div style={{ color: "red" }}>{authError}</div>} */}
          </form>
        </div>
      </div>
    </div>
  );
}
