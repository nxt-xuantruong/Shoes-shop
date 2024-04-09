import { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";

const init_data = {
  id: null,
  name: "",
  parent_id: 0,
};

export default function NewCategory() {
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState(init_data);

  useEffect(() => {
    categoryService.gets().then((response) => {
      if (response.data) {
        console.log(response.data.results);
        setCategory(response.data.results);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    categoryService.create(formData);
    alert("Đã thêm mới thành công");
    setFormData(init_data);
    // fileInputRefImages.current.value = "";
    // fileInputRefThumbnail.current.value = "";
  };

  console.log(formData);
  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Thêm danh mục</h5>
        </div>
        <div className="card-body">
          <form
            action=""
            method="POST"
            enctype="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label for="name">Tên danh mục</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="form-group col-8">
                    <label for="">
                      Danh mục cha <br></br>(nếu không chọn thì mặc định là danh mục cha)
                    </label>
                    <select
                      className="form-control"
                      name="category_id"
                      id=""
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          parent_id: e.target.value,
                        })
                      }
                    >
                      <option value="0" selected={formData.id === null}>
                        Chọn danh mục
                      </option>
                      {category.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              name="btn_submit"
              value="Thêm mới"
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              Thêm mới
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}