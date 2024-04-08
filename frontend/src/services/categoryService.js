import ApiService from "./ApiService";
class categoryService extends ApiService {
  get entity() {
    return "category";
  }
}

export default new categoryService();
