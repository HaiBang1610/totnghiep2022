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

class UserPassUpdate extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.updateUserPass = this.updateUserPass.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            currentUser: {
                id: null,
                password: "",
                admin: false,
            },
            password:"",
            pass_message: "",
        }
    }
    onChangePassword(e) {
        const password = e.target.value;
        this.setState({
          password: password
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
    updateUserPass(){
        var data ={
            id: this.state.currentUser.id,
            password: this.state.password
        }
        UserPacketDataService.updatePass(
            this.state.currentUser.id,
            data
        ).then(response => {
            console.log(response.data);
            this.setState({
              pass_message: "M???t kh???u ng?????i d??ng ???? ???????c thay ?????i th??nh c??ng!"
            });
          })
          .catch(e => {
            console.log(e);
          });
    }
    validationSchema(){
        return Yup.object().shape(
          {
            password: Yup.string().required("M???t kh???u kh??ng ???????c ????? tr???ng"),           
          }
        )
    }
    render(){
        const {currentUser, admin} =this.state;
        const initialValues = {
            password: this.state.password,
        };
        return(
            <div>
            {admin ?
            (<div className="edit-form">
                {currentUser.id 
                ?   (
                    <div>
                        <h4>{currentUser.username}</h4>
                        <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.updateUserPass}
                        enableReinitialize={true}
                        >
                            <Form>
                            <div className="form-group">
                            <label htmlFor="password">Nh???p m???t kh???u m???i</label>
                            <Field
                                type="password"
                                className="form-control"
                                id="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                            />
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
                                        <h5 class="modal-title" id="updateLabel">X??c nh???n c???p nh???t m???t kh???u m???i!</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        B???n c?? ch???c ch???n mu???n c???p nh???t m???t kh???u?
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
                            <button onClick={() => this.props.navigate(`/admin`)} className="badge bg-dark mr-2">
                                Tr??? l???i
                            </button>
                            <p style={{color:"red"}}>{this.state.pass_message}</p>
                            </div>
                            </Form>
                        </Formik>
                    </div>
                    )
                :   (
                    <div>
                      <br/>
                      <p>Ng?????i d??ng n??y kh??ng t???n t???i!</p>
                    </div>
                    )
                }
            </div>) : (<div>notfound...</div>)}
            </div>
        ) 
    }
}

export default withRouter(UserPassUpdate);