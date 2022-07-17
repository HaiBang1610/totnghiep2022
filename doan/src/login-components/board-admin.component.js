/* eslint-disable eqeqeq */
import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

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
      admin: false,
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
          admin: true,
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
    const { admin, searchName, users, currentUser, currentIndex } = this.state;
    return (
      <div>
        {admin ? 
        (<div className="list row">
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
        <div className="col-md-6">
          <h4>Danh sách người dùng {""}
          <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
              <i class="bi bi-arrow-clockwise"></i>
            </button>
          </h4>
          <h4>
            <Link to="/register">
              <button className="btn btn-sm btn-primary">
                <i class="bi bi-plus-circle text-light"></i>
                {" "}Thêm người dùng
              </button>
            </Link>
          </h4>
          <Scrollbars autoHeightMax={450} autoHeight>
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
                  {user.active =="1"
                ? <div className="d-flex justify-content-between" >{user.username} <span className="badge bg-success "><i class="bi bi-check-lg"></i></span></div>
                : <div className="d-flex justify-content-between" style={{color:"red"}}>{user.username} <span className="badge bg-danger "><i class="bi bi-lock-fill"></i></span></div>
                }
                </li>
              ))}
          </ul>   
          </Scrollbars>      
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div class="card">
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
                : (<label style={{color: "red"}}>
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
              <p style={{fontWeight: 'bold'}}>Vui lòng chọn một người dùng trong danh sách...</p>
            </div>
          )}
        </div></div>) : (<div>Not found....</div>)}
      </div>
    );
  }
}
