import ApiService from "./ApiService";
class OrderService extends ApiService {
  get entity() {
    return "orders";
  }

}

export default new OrderService();
