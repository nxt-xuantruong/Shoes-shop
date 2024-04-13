
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { updateUser } from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import customerServices from "../../../services/customerServices";

export default function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  useEffect(() => {
  

    customerServices.get(id).then((response) => {
      if (response.data) {
        setFormData({ ...response.data });
      }
    });

  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.address]: e.target.value,
      [e.target.email]: e.target.value,

    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUser(formData));
    customerServices.update(formData)
      .then(response => {
        if (response.data) {
          setFormData(response.data);
           alert("Đã cập nhật thành công");
        }
      })
      .catch((error) => {
        alert("Lỗi: " + error.message);
      })
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
                Họ và tên
              </label>

              <div className="col-md-8">
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

              <div className="col-md-8">
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
            <div className="form-group row mt-3">
              <label
                for="phone"
                className="col-md-4 col-form-label text-md-right"
                style={{ color: "black" }}
              >
                Phone
              </label>

              <div className="col-md-8">
                <input
                  id="phone"
                  type="phone"
                  className="form-control "
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <label
                for="address"
                className="col-md-4 col-form-label text-md-right"
                style={{ color: "black" }}
              >
                address
              </label>

              <div className="col-md-8">
                <input
                  id="address"
                  type="address"
                  className="form-control "
                  name="address"
                  value={formData.address}
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
