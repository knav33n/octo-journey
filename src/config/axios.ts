import axiosDefault from "axios";

const axios = axiosDefault.create();

axios.interceptors.request.use(
  function (config) {
    config.baseURL = process.env.REACT_APP_API_URL;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
