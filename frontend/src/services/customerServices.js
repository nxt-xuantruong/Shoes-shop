import ApiService from "./ApiService";

class CustomerServices extends ApiService {
    get entity() {
      return "customers";
    }
}

export default new CustomerServices();
