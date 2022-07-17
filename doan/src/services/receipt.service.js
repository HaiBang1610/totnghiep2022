import http from "../http-common";
class ReceiptDataService {
  getAll() {
    return http.get("/receipts");
  }
  get(id) {
    return http.get(`/receipts/${id}`);
  }
  create(data) {
    return http.post("/receipts", data);
  }
  findByName(name) {
    return http.get(`/receipts?customer_name=${name}`);
  }
  findByDate(date) {
    return http.get(`/receipts?createdTime=${date}`);
  }
}
export default new ReceiptDataService();