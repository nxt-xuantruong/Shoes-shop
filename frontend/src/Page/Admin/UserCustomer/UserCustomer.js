import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import customerServices from "../../../services/customerServices";

export default function UserCustomer() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const handledelete = (id) => {
    console.log(id);
    // dispatch(deleteUser(id));
  };
  useEffect(() => {
    customerServices.gets().then((response) => {
      if (response.data) {
        setUsers(response.data.results);
      }
    });
  }, []);

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Danh sách khách hàng</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-checkall">
            <thead>
              <tr>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link
                        className="btn btn-success btn-sm rounded-0 text-white"
                        to={"/admin/user/edit/" + item.id}
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm rounded-0 text-white"
                        onClick={() => handledelete(item.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h5 style={{ color: "red", marginTop: "10px" }}>
                  Không có khách hàng
                </h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}