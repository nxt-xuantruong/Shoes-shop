import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../../services/productService";
import categoryService from "../../../services/categoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function List() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productService.gets().then((response) => {
      if (response.data) {
        setProduct(response.data.results);
      }
    });

    categoryService.gets().then((response) => {
      if (response.data) {
        setCategories(response.data.results);
      }
    });
  }, []);

  const handleDelete = (id) => {
    productService.delete(id);
    setProduct((pre) => pre.filter((product) => product.id !== id));
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
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá sản phẩm</th>
                <th scope="col">Danh mục sản phẩm</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 ? (
                product.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.thumbnail} alt="ảnh" width={100}/>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        {
                          categories.find((it) => it.id === item.category_id)
                          ?.name || 'N/A'
                        }
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
                  Không có sản phẩm
                </h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}