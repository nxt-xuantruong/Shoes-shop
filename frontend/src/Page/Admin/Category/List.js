
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../../services/categoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ListCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.gets().then((response) => {
      if (response.data) {
        setCategories(response.data.results);
      }
    });
  }, []);

  const handleDelete = (id) => {
    categoryService.delete(id);
    setCategories((pre) => pre.filter((ct) => ct.id !== id));
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Danh sách sản phẩm</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-checkall">
            <thead>
              <tr>
                <th scope="col">Tên danh mục</th>
                <th scope="col">Tên danh mục cha</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        {categories.find((it) => it.id === item.parent_id)?.name || ""}
                      </td>
                      <td>{item.date}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            className="btn btn-success btn-sm rounded-0 text-white"
                            to={item.id + "/"}
                          >
                            <FontAwesomeIcon icon={faPenToSquare}/>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            onClick={() =>
                              window.confirm(
                                "Bạn có chắc chắn xóa bản ghi này"
                              ) && handleDelete(item.id)
                            }
                          >
                            <FontAwesomeIcon icon={faTrashCan}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h5 style={{ color: "red", marginTop: "10px" }}>
                  Không có danh mục
                </h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
