import ApiService from "./ApiService";
class bannerService extends ApiService {
  get entity() {
    return "banners";
  }

  async create(data) {
    let postData = new FormData()
    const { image, ...rest } = data;
    for (const key in rest) {
      postData.append(key, rest[key]);
    }
    if (image) {
      // postData.append("images", images);
        postData.append('image', image);
      }
    return this.request({
      method: "post",
      url: `/${this.entity}/`,
      data: postData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  }
  async update(data) {
    let postData = new FormData()
     const { id, image, ...rest } = data;
    for (const key in rest) {
      postData.append(key, rest[key]);
    }
    if (!image) {
      // postData.append("images", images);
        postData.append('image', image);
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



export default new bannerService();
