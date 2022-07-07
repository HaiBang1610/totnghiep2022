import React, { Component } from "react";
import SupplierDataService from "../services/supplier.service";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

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
      navigate={navigate}
      // etc...
    />
  );
};

class AddSupplier extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangePhone = this.onChangePhone.bind(this);
      this.onChangeAddress = this.onChangeAddress.bind(this);
      this.saveSupplier = this.saveSupplier.bind(this);
      this.newSupplier = this.newSupplier.bind(this);
      this.state = {
        id: null,
        name: "",
        name_checked:"",
        description: "", 
        phone: "",
        address: "",
        submitted: false,
        name_message: "",
        currentUser: false,
      };
    }
    componentDidMount() {
      UserService.getUserBoard().then(
        response => {
          this.setState({
            currentUser: true,
          });
          console.log(response.data)
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
    onChangeName(e) {
      this.setState({
        name_checked: e.target.value
      });
    }
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
      this.checkSupplierExisted()
    }
    onChangePhone(e) {
      this.setState({
        phone: e.target.value
      });
        this.checkSupplierExisted()
    }
    onChangeAddress(e) {
      this.setState({
        address: e.target.value
      });
      this.checkSupplierExisted()
    }
    checkSupplierExisted() {
      var name = this.state.name_checked;
        SupplierDataService.getName(name)
          .then(response => {
            this.setState({
              name_message: "Tên nhà cung cấp này đã tồn tại. Vui lòng nhập tên khác",
              name: null,
            });
          })
          .catch(e => {
            console.log(e);
            this.setState({
              name: this.state.name_checked,
              name_message: ""
            });
          });
      }
    saveSupplier() {
      var data = {
        name: this.state.name,
        description: this.state.description,
        phone: this.state.phone,
        address: this.state.address,
      };
      SupplierDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            phone: response.data.phone,
            address: response.data.address,
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    newSupplier() {
      this.setState({
        id: null,
        name: "",
        description: "",
        phone:"",
        address:"",
        submitted: false
      });
    }
    validationSchema(){
      return Yup.object().shape(
        {
          name: Yup.string().required("Tên nhà cung cấp là bắt buộc"),
          description: Yup.string().required("Thông tin chi tiết về nhà cung cấp là bắt buộc"),
          address: Yup.string().required("Địa chỉ của nhà cung cấp là bắt buộc"),
          phone: Yup.number().required("Số điện thoại của nhà cung cấp là bắt buộc")
        }
      )
    }
    render() {
      const {currentUser} = this.state;
      const initialValues = {
        name: this.state.name_checked,
        description: this.state.description,
        phone: this.state.phone,
        address: this.state.address,
      };
      return (
        <div>
          {currentUser ?
          (<div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Thông tin nhà cung cấp được thêm thành công!</h4>
                <button className="btn btn-success" onClick={this.newSupplier}>
                <i class="bi bi-plus-circle text-light"></i>
                {" "}Tiếp tục thêm
                </button>
                <Link to="/suppliers">
                    <button className="m-3 btn btn-danger">
                        <i class="bi bi-backspace text-light"></i>
                        {" "}Trở lại
                    </button>
                </Link>
              </div>
            ) : (
              <div>
                <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.saveSupplier}
                enableReinitialize={true}
                >
                <Form>
                <div className="form-group">
                  <label htmlFor="name">Tên nhà cung cấp</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="name"
                    //required
                    value={this.state.name_checked}
                    onChange={this.onChangeName}
                    name="name"
                  />
                  <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
                </div>
                <p style={{color:"red"}}>{this.state.name_message}</p>
                <div className="form-group">
                  <label htmlFor="description">Thông tin chi tiết</label>
                  <Field as="textarea"
                    className="form-control"
                    id="description"
                    //required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                  <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <Field
                    type="number"
                    className="form-control"
                    id="phone"
                   //required
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    name="phone"
                  />
                  <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="address"
                    //required
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    name="address"
                  />
                  <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
                </div>
                <button 
                //onClick={this.saveSupplier} 
                type="button"
                className="badge bg-success" 
                data-bs-toggle="modal" 
                data-bs-target="#add">
                  Tiếp tục
                </button>

                {/*Modal*/}
                <div class="modal fade" id="add" tabindex="-1" aria-labelledby="addLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="addLabel">Xác nhận thêm nhà cung cấp!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Bạn có chắc chắn muốn thêm nhà cung cấp này không?
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className="m-3 btn btn-sm btn-success" type="submit" data-bs-dismiss="modal">
                        <i class="bi bi-plus-circle text-light"></i>
                        {" "}Tiếp tục
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              <button type="button" onClick={() => this.props.navigate(`/suppliers`)} className="badge bg-danger mr-2">
                Trở lại
              </button>
              </Form>
              </Formik>
              </div>
            )}
          </div>) : (<div>notfound...</div>)}
        </div>
        );
    
    }
  }

  export default withRouter(AddSupplier)