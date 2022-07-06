import React, { Component } from "react";

import UserPacketDataService from "../services/userPacket.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// eslint-disable-next-line no-unused-vars
import { Modal } from "bootstrap";

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={useParams()} //useParams
      navigate={navigate}
      // etc...
    />
  );
};

class UserUpdate extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateActive = this.updateActive.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUserRole = this.updateUserRole.bind(this);
        this.state = {
            currentUser: {
                id: null,
                username:"",
                email: "",
                //password: "",
                active: false,
                roleId: ""
            },
            message: "",
            active_message: "",
            role_message: "",
        }
    }
    onChangeEmail(e) {
        const email = e.target.value;
        this.setState(function(prevState) {
          return {
            currentUser: {
              ...prevState.currentUser,
              email: email
            }
          };
        });
    }
    //onChangePassword(e) {
    //    const password = e.target.value;
    //    this.setState(function(prevState) {
    //      return {
    //        currentUser: {
    //          ...prevState.currentUser,
    //          password: password
    //        }
    //      };
    //    });
    //}
    onChangeRole(e) {
        const roleId = e.target.value;
        this.setState(function(prevState) {
          return {
            currentUser: {
              ...prevState.currentUser,
              roleId: roleId
            }
          };
        });
    }
    componentDidMount(){
        let {id} = this.props.params;
        this.getUser(id);
    }
    getUser(id) {
        UserPacketDataService.get(id)
          .then(response => {
            this.setState({
              currentUser: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    updateActive(status) {
        var data = {
          id: this.state.currentUser.id,
          email: this.state.currentUser.email,
          password: this.state.currentUser.password,
          roleId: this.state.currentUser.roleId,  
          active: status
        };
        UserPacketDataService.update(this.state.currentUser.id, data)
          .then(response => {
            this.setState(prevState => ({
              currentUser: {
                ...prevState.currentUser,
                active: status
              }
            }));
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    updateUserRole(){
        var data ={
            id: this.state.currentUser.id,
            roleId: this.state.currentUser.roleId
        }
        UserPacketDataService.updateRole(
            this.state.currentUser.id,
            data
        ).then(response => {
            console.log(response.data);
            this.setState({
              role_message: "Phân quyền người dùng đã được thay đổi thành công!"
            });
          })
          .catch(e => {
            console.log(e);
          });
    }
    updateUser() {
        UserPacketDataService.update(
          this.state.currentUser.id,
          this.state.currentUser
        )
          .then(response => {
            console.log(response.data);
            this.setState({
              message: "Thông tin người dùng đã được cập nhật thành công!"
            });
          })
          .catch(e => {
            console.log(e);
          });
    }
    deleteUser() {    
        UserPacketDataService.delete(this.state.currentUser.id)
          .then(response => {
            console.log(response.data);
            this.props.navigate('/admin')
          })
          .catch(e => {
            console.log(e);
          });
    }
    validationSchema(){
        return Yup.object().shape(
          {
            email: Yup.string().required("Email người dùng là bắt buộc"),           
          }
        )
      }
    render(){
        const {currentUser} =this.state;
        const initialValues = {
            email: currentUser.email,
        };
        return(
            <div className="edit-form">
                {currentUser.id 
                ? (<div>
                    <h4>{currentUser.username}</h4>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.updateUser}
                        enableReinitialize={true}
                    >
                        <Form>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="email"
                                value={currentUser.email}
                                onChange={this.onChangeEmail}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />
                            </div>
                            <div className="form-group">
                            <label>
                                <strong>Tình trạng:</strong>
                            </label>
                                {currentUser.active ? "Hoạt động" : "Bị khóa"}
                            </div>
                            <p style={{color:"red"}}>{this.state.active_message}</p>
                            {currentUser.active 
                            ? (<button
                                type="button"
                                className="badge bg-primary mr-2"
                                onClick={() => this.updateActive(false)}
                                >
                                Bị khóa
                                </button>) 
                            : (<button
                                type="button"
                                className="badge bg-primary mr-2"
                                onClick={() => this.updateActive(true)}
                                >
                                Hoạt động
                                </button>
                            )}
                            <button
                            type="button"
                            className="badge bg-success"
                            data-bs-toggle="modal" data-bs-target="#update"
                            >
                                Cập nhật
                            </button>
                         {/*UpdateModal*/}
                            <div class="modal fade" id="update" tabindex="-1" aria-labelledby="updateLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="updateLabel">Xác nhận cập nhật thông tin người dùng!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có chắc chắn muốn cập nhật người dùng này không?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="m-3 btn btn-sm btn-success" data-bs-dismiss="modal">
                                        <i class="bi bi-box-arrow-in-up text-light"></i>
                                        {" "}Tiếp tục
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <p style={{color:"red"}}>{this.state.message}</p>
                            <div className="form-group">
                            <label htmlFor="role">Phân quyền</label>
                            <select
                                className="form-control"
                                id="role"
                                value={currentUser.roleId}
                                onChange={this.onChangeRole}
                            >
                                <option value={'1'}>Admin</option>
                                <option value={'2'}>Moderator</option>
                                <option value={'3'}>User</option>
                            </select>
                            </div>
                            <button
                            type="button"
                            className="badge bg-success mr-2"
                            data-bs-toggle="modal" data-bs-target="#userrole"
                            >
                            Thay đổi
                            </button>
                            {/*UpdateroleModal*/}
                            <div class="modal fade" id="userrole" tabindex="-1" aria-labelledby="userroleLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="userroleLabel">Xác nhận thay đổi phân quyền người dùng!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có chắc chắn muốn thay đổi?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button"className="m-3 btn btn-sm btn-success" onClick={this.updateUserRole} data-bs-dismiss="modal">
                                            Tiếp tục
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <p style={{color:"red"}}>{this.state.role_message}</p>
                            <button
                            type="button"
                            className="badge bg-danger mr-2"
                            data-bs-toggle="modal" data-bs-target="#remove"
                            >
                            Xóa
                            </button>
                        {/*DeleteModal*/}
                            <div class="modal fade" id="remove" tabindex="-1" aria-labelledby="removeLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="removeLabel">Xác nhận xóa người dùng!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có chắc chắn muốn xóa người dùng này không?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteUser} data-bs-dismiss="modal">
                                        <i class="bi bi-trash text-light"></i>
                                            Tiếp tục
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <button onClick={() => this.props.navigate(`/admin`)} className="badge bg-dark mr-2">
                                Trở lại
                            </button>
                        </Form>    
                    </Formik>
                   </div>
                ): (
                    <div>
                      <br/>
                      <p>Người dùng này không tồn tại!</p>
                    </div>
                    )
                }
            </div>
        )
    }
}

export default withRouter(UserUpdate);