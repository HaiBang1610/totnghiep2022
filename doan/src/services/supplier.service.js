import http from "../http-common";
class SupplierDataService {
  getAll() {
    return http.get("/suppliers");
  }
  get(id) {
    return http.get(`/suppliers/${id}`);
  }
  getName(name) {
    return http.get(`/suppliers/name/${name}`);
  }
  create(data) {
    return http.post("/suppliers", data);
  }
  update(id, data) {
    return http.put(`suppliers/${id}`, data);
  }
  delete(id) {
    return http.delete(`/suppliers/${id}`);
  }
  deleteAll() {
    return http.delete(`/suppliers`);
  }
  findByName(name) {
    return http.get(`/suppliers?name=${name}`);
  }
}
export default new SupplierDataService();