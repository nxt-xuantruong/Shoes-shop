import ApiService from "./ApiService";
class orderService extends ApiService {
  get entity() {
    return "orders";
  }

}

export default new orderService();
