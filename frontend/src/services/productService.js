import ApiService from "./ApiService";
class ProductService extends ApiService {
  get entity() {
    return "products";
  }

  async create(data) {
    let postData = new FormData()
    const { images, ...rest } = data;
    for (const key in rest) {
      postData.append(key, rest[key]);
    }

    if (images && images.length > 0) {
      // postData.append("images", images);
      images.forEach((image, i) => {
        if (!image.id) {
          postData.append('images[]', image);
        }
      })
    }

    return this.request({
      method: "post",
      url: `/${this.entity}/`,
      data: postData,
      config: {
        headers: {
          "Content-Type": "application/multipart/form-data",
        },
      },
    });
  }

  async update(data) {
    let postData = new FormData()
    const { id, images, ...rest } = data;
    for (const key in rest) {
      postData.append(key, rest[key]);
    }

    console.log("images:" + images);

    if (images && images.length > 0) {
      // postData.append("images", images);
      images.forEach((image, i) => {
        if (!image.id) {
          postData.append('images[]', image);
        }
      })
    }
    return this.request({
      method: "put",
      url: `/${this.entity}/${id}/`,
      data: postData,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    });
  }
}

export default new ProductService();
