import { store } from "../Config/store";
import ApiService from "./ApiService";
import { getConfigApp } from "./appConfig";

class OauthServices extends ApiService {
  get entity() {
    return "o";
  }

  async login(credential) {
    const { username, password } = credential;
    const data = getConfigApp();
    data.append("grant_type", "password");
    // data.append(
    //   "scope",
    //   "read product:read product:create product:update product:delete"
    // );
    data.append("username", username);
    data.append("password", password);
    console.log(data);
    return this.request({
      method: "post",
      url: `/${this.entity}/token/`,
      data: data, 
    });
  }
  

  async logout() {
    // eslint-disable-next-line no-unused-vars
    const state = store.getState();
    const { oauthInfo } = state.oauth;
    const { access_token } = oauthInfo;
    const data = getConfigApp();
    data.append("token",access_token);
    const option = {
      method: "post",
      url: `/${this.entity}/revoke_token/`,
      data: data,
    };
    return this.request(option);
  }
}

export default new OauthServices();
