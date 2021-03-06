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
              placeholder="T??m ki???m theo t??n ng?????i d??ng"
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
                T??m ki???m
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Danh s??ch ng?????i d??ng {""}
          <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
              <i class="bi bi-arrow-clockwise"></i>
            </button>
          </h4>
          <h4>
            <Link to="/register">
              <button className="btn btn-sm btn-primary">
                <i class="bi bi-plus-circle text-light"></i>
                {" "}Th??m ng?????i d??ng
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
                  C???p nh???t th??ng tin<br/>
                </Link>
                <Link to={`/usersPacketPass/${currentUser.id}`}>
                  Thay ?????i m???t kh???u
                </Link></div>
              )
              }
              <div>
                <label>
                  <strong>T??n ng?????i d??ng:</strong>
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
                    <strong>T??nh tr???ng:</strong>
                    {" "}Ho???t ?????ng
                  </label>)
                : (<label style={{color: "red"}}>
                    <strong>T??nh tr???ng:</strong>
                    {" "}B??? kh??a
                  </label>)
                }                     
              </div>
              <div>
                {currentUser.roleId =="1"
                ? <label>
                   <strong>Ph??n quy???n:</strong>
                   {" "}Admin
                  </label>
                : currentUser.roleId =="2"
                    ? <label>
                        <strong>Ph??n quy???n:</strong>
                        {" "}Moderator
                      </label>   
                    : <label>
                        <strong>Ph??n quy???n:</strong>
                        {" "}User
                      </label> 
                }                   
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p style={{fontWeight: 'bold'}}>Vui l??ng ch???n m???t ng?????i d??ng trong danh s??ch...</p>
            </div>
          )}
        </div></div>) : (<div>Not found....</div>)}
      </div>
    );
  }
}
