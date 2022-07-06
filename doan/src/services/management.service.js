import http from "../http-common";
class ManagementDataService {
  getAll() {
    return http.get("/managements");
  }
  get(id) {
    return http.get(`/managements/${id}`);
  }
  create(data) {
    return http.post("/managements", data);
  }
  delete(id) {
    return http.delete(`/managements/${id}`);
  }
  findByName(product_name) {
    return http.get(`/managements?product_name=${product_name}`);
  }
  findByDate(date) {
    return http.get(`/managements?datetime=${date}`);
  }
  getTotalPrice(date){
    return http.get(`/managements/datetime/${date}`);
  }
}
export default new ManagementDataService();