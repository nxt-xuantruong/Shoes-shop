import axios from "axios";
import { getConfigApp } from "./appConfig";

import { store } from "../Config/store";
import { updateOauthInfo, logOut } from "../Config/store/oauth";

const APP_API_URL = "http://localhost:8000/api/";
// const Cookie = require("js-cookie");
export default class Http {
  constructor(status) {
    this.handlerEnabled =
      status && status.handlerEnabled ? status.handlerEnabled : false;
    this.instance = axios.create({
      baseURL: APP_API_URL,
    });
    return this.init();
  }

  requestHandler(request) {
    const state = store.getState();
    const { oauthInfo } = state.oauth;
    const { access_token } = oauthInfo;
    if (access_token && access_token.length !== 0) {
      request.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return request;
  }

  errorHandler(error) {
    if (error?.response?.status === 401) {
      this.renewToken();
    }
    return Promise.reject(error);
  }

  successHandler(response) {
    if (this.handlerEnabled) {
      return response; // TODO: Handle Success Response if need
    }
    return response;
  }

  init() {
    this.instance.interceptors.request.use((request) =>
      this.requestHandler(request)
    );
    this.instance.interceptors.response.use(
      (response) => this.successHandler(response),
      (error) => this.errorHandler(error)
    );
    return this.instance;
  }

  async renewToken() {
    const state = store.getState();
    const { oauthInfo } = state.oauth;
    const { refresh_token } = oauthInfo;
    if (refresh_token) {
      const data = getConfigApp();
      data.append("refresh_token", refresh_token);
      data.append("grant_type", "refresh_token");
      this.instance
        .post(`o/token/`, data)
        .then((response) => {
          const { data } = response;
          store.dispatch(updateOauthInfo(data));
        })
        .catch((error) => {
          console.error(error);
          store.dispatch(logOut());
        });
    }
    return false;
  }
}