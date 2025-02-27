import { useEffect, useState, useRef } from "react";
import images from "../../../../public/assets/img-product.png";
import categoryService from "../../../services/categoryService";
import productService from "../../../services/productService";
import { useNavigate, useParams } from "react-router-dom";

const init_data = {
  name: "",
  price: 0,
  discount: 0,
  thumbnail: null,
  desc: "",
  number: 0,
  category_id: null,
};

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState(init_data);
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    categoryService.gets({full_data:true}).then((response) => {
      if (response.data) {
        setCategory(response.data);
      }
    });

    productService.get(id).then((response) => {
      if (response.data) {
        setFormData({ ...response.data });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files).map((file) => {
      return URL.createObjectURL(file);
    });

    if (selectedImages.length > 3) {
      alert("tối đa 3 ảnh!");
      e.target.value = "";
      setNewImages(Array.from({ length: 3 }).fill(images))
      return;
    }

    setNewImages(selectedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...formData }
    // console.log("thumbnailRef", thumbnailRef.current.files[0]);
    if (thumbnailRef && thumbnailRef.current.files[0]) {
      data = { ...data, thumbnail: thumbnailRef.current.files[0] };
    }

    if (imagesRef && imagesRef.current.files.length > 0) {
      data = { ...data, images: Array.from(imagesRef.current.files) };
    }
    productService.update(data)
      .then(response => {
        if (response.data) {
          setFormData(response.data);
           alert("Đã cập nhật thành công");
        }
      })
      .catch((error) => {
        alert("Lỗi: " + error.message);
      })
      .finally(() => {
        setNewThumbnail(null);
        setNewImages([]);
        imagesRef.current.value = null;
        thumbnailRef.current.value = null;
      });
    
   
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Cập nhật sản phẩm</h5>
        </div>
        <div className="card-body">
          <form
            action=""
            method="POST"
            enctype="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-5">
                <div className="form-group">
                  <label for="name">Tên sản phẩm</label>
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
                
                <div className="form-row">
                  <div className="col-6">
                    <div className="form-group">
                      <label for="price">Giá</label>
                      <input
                        className="form-control"
                        type="number"
                        name="price"
                        required=""
                        min="0"
                        max="999999999"
                        maxlength="9"
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        value={formData.price}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label for="sale_off">Giảm giá (Không bắt buộc)</label>
                      <input
                        className="form-control"
                        type="number"
                        name="discount"
                        min="0"
                        max="100"
                        maxlength="3"
                        onChange={(e) =>
                          setFormData({ ...formData, discount: e.target.value })
                        }
                        value={formData.discount}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label for="sale_off">Số lượng</label>
                      <input
                        className="form-control"
                        type="number"
                        name="number"
                        min="0"
                        max="100"
                        maxlength="3"
                        onChange={(e) =>
                          setFormData({ ...formData, number: e.target.value })
                        }
                        value={formData.number}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="row">
                  <div className="form-group col-6">
                    <label for="">Danh mục</label>
                    <select
                      className="form-control"
                      name="category_id"
                      id=""
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Chọn danh mục</option>
                      {category.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.id}
                            selected={item.id === formData.category_id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div id="uploadFile" className="col-6">
                    <label>Thumbnail</label>
                    <input
                      type="file"
                      className="d-block mb-2"
                      name="thumbnail"
                      id="thumbnail"
                      onChange={(e) =>
                        setNewThumbnail(URL.createObjectURL(e.target.files[0]))
                      }
                      ref={thumbnailRef}
                    />
                    {
                      newThumbnail ? (
                        <img
                          className="img"
                          src={newThumbnail}
                          alt="ảnh"
                          style={{
                            width: "150px",
                            height: "150px",
                            padding: "10px",
                          }}
                        />
                      ) : (
                          formData.thumbnail && <img
                            className="img"
                            src={formData.thumbnail}
                            alt="ảnh"
                            style={{
                              width: "150px",
                              height: "150px",
                              padding: "10px",
                            }}
                          />
                      )
                    }
                  </div>

                  <div className="col-6 images_describe">
                    <label>Hình ảnh mô tả(tối đa 3 ảnh)</label>
                    <input
                      type="file"
                      name="images[]"
                      id="images"
                      multiple
                      onChange={handleImageChange}
                      ref={imagesRef}
                    />
                    <div id="images" className="mt-2">
                      <span>
                        {
                          newImages && newImages.length > 0 ? (
                            newImages.map((item, index) => <img
                              key={index}
                              className="img"
                              src={item}
                              alt="ảnh"
                              style={{
                                width: "100px",
                                height: "100px",
                                padding: "10px",
                              }}
                            />)
                          ) : (
                              formData.images && formData.images.length > 0 &&  formData.images.map((item) => <img
                                key={item.id}
                                className="img"
                                src={item.image}
                                alt="ảnh"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  padding: "10px",
                                }}
                            />)
                          )
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="content">Nội dung sản phẩm</label>
              <textarea
                name="desc"
                className="form-control content_section"
                cols="50"
                rows="10"
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                value={formData.desc}
              ></textarea>
            </div>

            <button
              type="submit"
              name="btn_submit"
              value="update"
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}