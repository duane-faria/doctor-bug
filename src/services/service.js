import axios from "./axios";

class Service {
  constructor(endpoint) {
    this.url = endpoint;
    this.axios = axios;
  }

  create(object) {
    return axios.post(this.url, object);
  }

  update(object) {
    return axios.put(this.url, object);
  }

  get(params) {
    return axios.get(`${this.url}/${params}`);
  }

  getAll(params = "") {
    return axios.get(this.url + "s" + params);
  }

  delete(params) {
    return axios.delete(`${this.url}/${params}`);
  }
}

export default Service;
