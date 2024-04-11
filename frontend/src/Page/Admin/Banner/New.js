import { useEffect, useRef, useState } from "react";

import bannerService from "../../../services/bannerService";
const init_data = {
  title: "",
};

export default function BannerNew() {
  const imageRef = useRef(null);
  const [formData, setFormData] = useState(init_data);
  const [newImage, setNewImage] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...formData }
    // console.log("thumbnailRef", thumbnailRef.current.files[0]);
    if (imageRef && imageRef.current.files[0]) {
      data = { ...data, image: imageRef.current.files[0] };
    }

    bannerService.create(data)
        .then((response) => {
        alert("Đã thêm mới thành công");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      })
      .finally(() => {
        setFormData(init_data);
        imageRef.current.value = "";
        setNewImage(null);
      })
  };

  return (
    <div id="content" className="container-fluid">
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
          <h5 className="m-0">Thêm mới banner</h5>
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
                  <label for="name">Tên banner</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-7">
                <div className="row">
                  <div id="uploadFile" className="col-6">
                    <label>Banner</label>
                    <input
                      type="file"
                      className="d-block mb-2"
                      name="banner"
                      id="banner"
                      onChange={(e) => {
                        setNewImage(URL.createObjectURL(e.target.files[0]))
                      }}
                      ref={imageRef}
                    />
                    {
                      newImage && 
                        <img
                          className="img"
                          src={newImage}
                          alt="ảnh"
                          style={{
                            width: "350px",
                            height: "250px",
                            padding: "10px",
                          }}
                        />
                    }
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