import ApiService from "./ApiService";
class OrderItemService extends ApiService {
  get entity() {
    return "orderitems";
  }

  async update({ data, id }) {
    return this.request({
      method: "put",
      url: `/${this.entity}/${id}/`,
      data: data,
    });
  }
}

export default new OrderItemService();
