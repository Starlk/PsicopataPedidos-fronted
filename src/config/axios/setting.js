import { Store } from "vuex";
import { getSilentToken } from "@/config/azure-ad/settings";

export class AxiosSetting {
  configureInterceptor(http) {
    http.interceptors.request.use(
      async (request) => {
        var token = localStorage.getItem("token");
        if (token) {
          request.headers.common["Authorization"] = `Bearer ${token}`;
          request.headers["Authorization"] = `Bearer ${token}`;
        }
        return request;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    http.interceptors.response.use(undefined, async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          await setToken(http.defaults, originalRequest);
          return http(originalRequest);
        }
      }
      return Promise.reject(error);
    });
    const setToken = async (request, originalRequest = null) => {
      const res = await getSilentToken();
      if (res && res.accessToken) {
        request.headers.common["Authorization"] = `Bearer ${res.accessToken}`; // This fails if MSAL requested a new token
        if (originalRequest) {
          originalRequest.headers.Authorization =
            request.headers.common["Authorization"];
        }
      } else {
        var token = localStorage.getItem("token");
        request.headers.common["Authorization"] = `Bearer ${token}`;
        if (originalRequest) {
          originalRequest.headers.Authorization =
            request.headers.common["Authorization"];
        }
      }
    };
  }
}
