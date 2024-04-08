import Http from "./http";

export default class ApiService {
  constructor() {
    if (!this.entity) {
      throw new Error("Child service class not provide entity");
    }
  }

  request(data, isLoading = false) {
    const status = { handlerEnabled: true };
    const http = new Http(status);
    if (!data) {
      return http;
    }
    const option = {
      method: data.method,
      url: data.url,
      data: data.data,
      params: data.params,
    };
    return http(option)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      })
      .finally(() => {
        //Todo: check if we need to do anything here
      });
  }
  async create(data) {
    return this.request({
      method: "post",
      url: `/${this.entity}/`,
      data: data,
    });
  }

  async search(data) {
    const option = {
      method: "get",
      url: `/${this.entity}/search`,
      params: data,
    };
    return this.request(option);
  }

  async gets(params = null) {
    let option = {
      method: "get",
      url: `/${this.entity}/`,
    };
    if (params) {
      option = { ...option, params };
    }
    return this.request(option);
  }
  async get(id) {
    return this.request({
      method: "get",
      url: `/${this.entity}/${id}/`,
    });
  }

  async update(data) {
    const { id } = data;
    return this.request({
      method: "put",
      url: `/${this.entity}/${id}/`,
      data: data,
    });
  }

  async delete(id) {
    return this.request({
      method: "delete",
      url: `/${this.entity}/${id}/`,
    });
  }
}
