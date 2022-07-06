import http from "../http-common";
class UserPacketDataService {
  getAll() {
    return http.get("/usersPacket");
  }
  get(id) {
    return http.get(`/usersPacket/${id}`);
  }
  update(id, data) {
    return http.put(`/usersPacket/${id}`, data);
  }
  updateRole(id, data) {
    return http.put(`/usersPacket/role/${id}`, data);
  }
  updatePass(id, data) {
    return http.put(`/usersPacket/pass/${id}`, data);
  }
  delete(id) {
    return http.delete(`/usersPacket/${id}`);
  }
  findByName(name) {
    return http.get(`/usersPacket?username=${name}`);
  }
}
export default new UserPacketDataService();