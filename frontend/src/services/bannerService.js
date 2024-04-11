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
}



export default new bannerService();
