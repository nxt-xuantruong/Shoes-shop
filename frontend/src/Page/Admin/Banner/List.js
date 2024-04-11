import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bannerService from "../../../services/bannerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function BannerList() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    bannerService.gets().then((response) => {
      if (response.data) {
        setBanners(response.data.results);
      }
    });

  }, []);

  const handleDelete = (id) => {
    bannerService.delete(id);
    setBanners((pre) => pre.filter((banner) => banner.id !== id));
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Danh sách banner</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-checkall">
            <thead>
              <tr>
                <th scope="col">Tên banner</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {banners.length > 0 ? (
                banners.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>
                        <img src={item.image} alt="ảnh" width={100}/>
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
                  Không có banner
                </h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}