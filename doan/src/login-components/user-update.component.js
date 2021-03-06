import React, { Component } from "react";

import UserPacketDataService from "../services/userPacket.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";

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
            admin: false,
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
        UserService.getAdminBoard().then(
          response => {
            this.setState({
              admin: true,
            });
          },
          error => {}
        );
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
              role_message: "Ph??n quy???n ng?????i d??ng ???? ???????c thay ?????i th??nh c??ng!"
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
              message: "Th??ng tin ng?????i d??ng ???? ???????c c???p nh???t th??nh c??ng!"
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
            email: Yup.string().required("Email ng?????i d??ng l?? b???t bu???c"),           
          }
        )
      }
    render(){
        const {currentUser, admin} =this.state;
        const initialValues = {
            email: currentUser.email,
        };
        return(
            <div>
              {admin ?
                (<div className="edit-form">
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
                                <strong>T??nh tr???ng:</strong>
                            </label>
                                {currentUser.active ? "Ho???t ?????ng" : "B??? kh??a"}
                            </div>
                            <p style={{color:"red"}}>{this.state.active_message}</p>
                            {currentUser.active 
                            ? (<button
                                type="button"
                                className="badge bg-primary mr-2"
                                onClick={() => this.updateActive(false)}
                                >
                                B??? kh??a
                                </button>) 
                            : (<button
                                type="button"
                                className="badge bg-primary mr-2"
                                onClick={() => this.updateActive(true)}
                                >
                                Ho???t ?????ng
                                </button>
                            )}
                            <text>{" "}</text>
                            <button
                            type="button"
                            className="badge bg-success"
                            data-bs-toggle="modal" data-bs-target="#update"
                            >
                                C???p nh???t
                            </button>
                         {/*UpdateModal*/}
                            <div class="modal fade" id="update" tabindex="-1" aria-labelledby="updateLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="updateLabel">X??c nh???n c???p nh???t th??ng tin ng?????i d??ng!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        B???n c?? ch???c ch???n mu???n c???p nh???t ng?????i d??ng n??y kh??ng?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="m-3 btn btn-sm btn-success" data-bs-dismiss="modal">
                                        <i class="bi bi-box-arrow-in-up text-light"></i>
                                        {" "}Ti???p t???c
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <p style={{color:"red"}}>{this.state.message}</p>
                            <div className="form-group">
                            <label htmlFor="role">Ph??n quy???n</label>
                            <select
                                className="form-control"
                                id="role"
                                value={currentUser.roleId}
                                onChange={this.onChangeRole}
                            >
                                <option value={'1'}>Admin</option>
                                <option value={'3'}>User</option>
                            </select>
                            </div>
                            <div><label></label></div>
                            <button
                            type="button"
                            className="badge bg-success mr-2"
                            data-bs-toggle="modal" data-bs-target="#userrole"
                            >
                            Thay ?????i
                            </button>
                            {/*UpdateroleModal*/}
                            <div class="modal fade" id="userrole" tabindex="-1" aria-labelledby="userroleLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="userroleLabel">X??c nh???n thay ?????i ph??n quy???n ng?????i d??ng!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        B???n c?? ch???c ch???n mu???n thay ?????i?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button"className="m-3 btn btn-sm btn-success" onClick={this.updateUserRole} data-bs-dismiss="modal">
                                            Ti???p t???c
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
                            X??a
                            </button>
                        {/*DeleteModal*/}
                            <div class="modal fade" id="remove" tabindex="-1" aria-labelledby="removeLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="removeLabel">X??c nh???n x??a ng?????i d??ng!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        B???n c?? ch???c ch???n mu???n x??a ng?????i d??ng n??y kh??ng?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteUser} data-bs-dismiss="modal">
                                        <i class="bi bi-trash text-light"></i>
                                            Ti???p t???c
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <text>{" "}</text>
                            <button onClick={() => this.props.navigate(`/admin`)} className="badge bg-dark mr-2">
                                Tr??? l???i
                            </button>
                        </Form>    
                    </Formik>
                   </div>
                ): (
                    <div>
                      <br/>
                      <p>Ng?????i d??ng n??y kh??ng t???n t???i!</p>
                    </div>
                    )
                }</div>) : (<div>notfound...</div>)}
            </div>
        )
    }
}

export default withRouter(UserUpdate);