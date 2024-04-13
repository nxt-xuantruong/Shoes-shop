import ApiService from "./ApiService";
class OrderItemService extends ApiService {
  get entity() {
    return "orderitems";
  }

}

export default new OrderItemService();
