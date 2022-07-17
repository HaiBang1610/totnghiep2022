import http from "../http-common";
class ProductDataService {
  getAll() {
    return http.get("/products");
  }
  get(id) {
    return http.get(`/products/${id}`);
  }
  getName(name) {
    return http.get(`/products/name/${name}`);
  }
  create(data) {
    return http.post("/products", data);
  }
  update(id, data) {
    return http.put(`/products/${id}`, data);
  }
  delete(id) {
    return http.delete(`/products/${id}`);
  }
  deleteAll() {
    return http.delete(`/products`);
  }
  findByName(name) {
    return http.get(`/products?name=${name}`);
  }
  findByCategory(category) {
    return http.get(`/products?category=${category}`);
  }
  findBySupplier(supplier_id) {
    return http.get(`/products?supplier_id=${supplier_id}`);
  }
  findAllCategories() {
    return http.get("/products/category");
  }
  findAllOutStock() {
    return http.get("/products/outstock");
  }
  findAllStock() {
    return http.get("/products/stock");
  }
}
export default new ProductDataService();