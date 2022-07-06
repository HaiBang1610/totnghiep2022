/* eslint-disable eqeqeq */
import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { Link } from "react-router-dom";

import UserPacketDataService from "../services/userPacket.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      content: "",
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveUsers();
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  retrieveUsers() {
    UserPacketDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }
  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }
  searchName() {
    UserPacketDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, users, currentUser, currentIndex } = this.state;
    return (
      <div className="list row">
        {/*Search Bar---------------------------------------------------------------*/}
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên người dùng"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.searchName}
              >
                <i class="bi bi-search"></i>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        {/*User List-----------------------------------------------------------------------*/}
        <div className="col-md-6">
          <h4>Danh sách người dùng {""}
          </h4>
          <h4>
            <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
              <i class="bi bi-arrow-clockwise"></i>
            </button>
            <text>{" "}</text>
            <Link to="/register">
              <button className="btn btn-sm btn-primary">
                <i class="bi bi-plus-circle text-light"></i>
                {" "}Thêm người dùng
              </button>
            </Link>
          </h4>
          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
                </li>
              ))}
          </ul>         
        </div>
        {/*user Detail--------------------------------------------------------------------*/}
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>{currentUser.username}</h4>
              {currentUser.roleId == "1"
              ? <></>
              : (<div><Link to={`/usersPacket/${currentUser.id}`}>
                  Cập nhật thông tin<br/>
                </Link>
                <Link to={`/usersPacketPass/${currentUser.id}`}>
                  Thay đổi mật khẩu
                </Link></div>
              )
              }
              <div>
                <label>
                  <strong>Tên người dùng:</strong>
                  {" "}{currentUser.username}
                </label>
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                  {" "}{currentUser.email}
                </label>
              </div>
              {/*<div>
                <label>
                  <strong>Password:</strong>
                  {" "}{currentUser.password}
                </label>
              </div>*/}
              <div>
                {currentUser.active =="1"
                ? (<label>
                    <strong>Tình trạng:</strong>
                    {" "}Hoạt động
                  </label>)
                : (<label>
                    <strong>Tình trạng:</strong>
                    {" "}Bị khóa
                  </label>)
                }                     
              </div>
              <div>
                {currentUser.roleId =="1"
                ? <label>
                   <strong>Phân quyền:</strong>
                   {" "}Admin
                  </label>
                : currentUser.roleId =="2"
                    ? <label>
                        <strong>Phân quyền:</strong>
                        {" "}Moderator
                      </label>   
                    : <label>
                        <strong>Phân quyền:</strong>
                        {" "}User
                      </label> 
                }                   
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Vui lòng chọn một người dùng trong danh sách...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
