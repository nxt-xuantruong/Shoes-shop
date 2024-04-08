import ApiService from "./ApiService";
class OrderService extends ApiService {
  get entity() {
    return "orders";
  }

  async update({ data, id }) {
    return this.request({
      method: "put",
      url: `/${this.entity}/${id}/`,
      data: data,
    });
  }
}

export default new OrderService();
