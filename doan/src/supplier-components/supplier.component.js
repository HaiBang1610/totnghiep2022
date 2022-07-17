import React, { Component } from "react";
import SupplierDataService from "../services/supplier.service";
import ProductDataService from "../services/product.service";
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

class Supplier extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangePhone = this.onChangePhone.bind(this);
      this.onChangeAddress = this.onChangeAddress.bind(this);
      this.getSupplier = this.getSupplier.bind(this);
      this.getProduct = this.getProduct.bind(this);
      this.updateSupplier = this.updateSupplier.bind(this);
      this.deleteSupplier = this.deleteSupplier.bind(this);
      this.state = {
        currentSupplier: {
          supplier_id: null,
          supplier_name: "",
          supplier_description: "",
          supplier_phone: "",
          supplier_address: "",
        },
        disabledUpdate: null,
        messageProductLink: "",
        messageProductNotLink: "",
        message: "",
        currentUser: "",
      };
    }
    componentDidMount() {
      let { id } = this.props.params;
      //this.getProduct(this.props.match.params.id);
      this.getSupplier(id);
      this.getProduct(id);
      UserService.getUserBoard().then(
        response => {
          this.setState({
            currentUser: true,
          });
          console.log(response.data)
        },
        error => {}
      );
    }
    onChangeName(e) {
      const name = e.target.value;
      this.setState(function(prevState) {
        return {
          currentSupplier: {
            ...prevState.currentSupplier,
            supplier_name: name
          }
        };
      });
    }
    onChangeDescription(e) {
      const description = e.target.value;     
      this.setState(prevState => ({
        currentSupplier: {
          ...prevState.currentSupplier,
          supplier_description: description
        }
      }));
    }
    onChangePhone(e) {
        const phone = e.target.value;
        this.setState(prevState => ({
            currentSupplier: {
              ...prevState.currentSupplier,
              supplier_phone: phone
            }
          }));
      }
      onChangeAddress(e) {
        const address = e.target.value;
        this.setState(prevState => ({
            currentSupplier: {
              ...prevState.currentSupplier,
              supplier_address: address
            }
          }));
      }
    getSupplier(id) {
        SupplierDataService.get(id)
        .then(response => {
          this.setState({
            currentSupplier: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    getProduct(supplier_id) {
      ProductDataService.findBySupplier(supplier_id)
      .then(response =>{
        console.log(response.data);
        if(response.data.length > 0)
        this.setState({
          disabledUpdate: true,
          messageProductLink: "Nhà cung cấp này đã được liên kết với sản phẩm! Không thể xóa!",
        });
        else {
          this.setState({
            disabledUpdate: false,
            messageProductNotLink: "Nhà cung cấp này chưa được liên kết với sản phẩm",
          });
        }
      })
      .catch(e => {
      })
    }
    updateSupplier() {
        SupplierDataService.update(
        this.state.currentSupplier.supplier_id,
        this.state.currentSupplier
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "Thông tin nhà cung cấp đã được cập nhật thành công!"
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
    deleteSupplier() {    
        SupplierDataService.delete(this.state.currentSupplier.supplier_id)
        .then(response => {
          console.log(response.data);
          this.props.navigate('/suppliers')
        })
        .catch(e => {
          console.log(e);
        });
    }
    validationSchema(){
      return Yup.object().shape(
        {
          //name: Yup.string().required("Tên nhà cung cấp là bắt buộc"),
          description: Yup.string().required("Thông tin chi tiết về nhà cung cấp là bắt buộc"),
          address: Yup.string().required("Địa chỉ của nhà cung cấp là bắt buộc"),
          phone: Yup.number().required("Số điện thoại của nhà cung cấp là bắt buộc")
        }
      )
    }
    render() {
      const { currentSupplier, currentUser } = this.state;
      const initialValues = {
        description: currentSupplier.supplier_description,
        address: currentSupplier.supplier_address,
        phone: currentSupplier.supplier_phone,
      };
      return (
        <div>
        {currentUser ?
        (<div>
          {currentSupplier.supplier_id ? (
            <div className="edit-form">
              <h4>Nhà cung cấp</h4>
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.updateSupplier}
                enableReinitialize={true}
              >
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    id="name"
                    value={currentSupplier.supplier_name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Thông tin chi tiết</label>
                  <Field as="textarea"
                    className="form-control"
                    id="description"
                    value={currentSupplier.supplier_description}
                    onChange={this.onChangeDescription}
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
                    value={currentSupplier.supplier_phone}
                    onChange={this.onChangePhone}
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
                    value={currentSupplier.supplier_address}
                    onChange={this.onChangeAddress}
                  />
                  <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                  />
                </div>
                <div><label></label></div>
              <button
                type="button"
                className="badge bg-danger mr-2"
                //onClick={this.deleteSupplier}
                data-bs-toggle="modal" data-bs-target="#remove"
                disabled={this.state.disabledUpdate}
              >
                Xóa
              </button>
              {/*Modal*/}
            <div class="modal fade" id="remove" tabindex="-1" aria-labelledby="removeLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="removeLabel">Xác nhận xóa nhà cung cấp!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Bạn có chắc chắn muốn xóa nhà cung cấp này không?
                </div>
                <div class="modal-footer">
                  <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="m-3 btn btn-sm btn-danger" onClick={this.deleteSupplier} data-bs-dismiss="modal">
                    <i class="bi bi-trash text-light"></i>
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
            </div>
            <text>{" "}</text>
              <button
                type="button"
                className="badge bg-success"
                //onClick={this.updateSupplier}
                data-bs-toggle="modal" data-bs-target="#update"
              >
                Cập nhật
              </button>
              {/*Modal*/}
            <div class="modal fade" id="update" tabindex="-1" aria-labelledby="updateLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="updateLabel">Xác nhận cập nhật thông tin nhà cung cấp!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Bạn có chắc chắn muốn cập nhật nhà cung cấp này không?
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
            <text>{" "}</text>
              <button type= "button" onClick={() => this.props.navigate(`/suppliers`)} className="badge bg-dark mr-2">
                Trở lại
              </button>
              <p style={{color:"red"}}>{this.state.message}</p>
              <p style={{color:"red"}}>{this.state.messageProductLink}</p>
              <p style={{color:"green"}}>{this.state.messageProductNotLink}</p>
              </Form>
              </Formik>
            </div>
          ) : (
            <div>
              <br />
              <p>Nhà cung cấp này không tồn tại!</p>
            </div>
          )}
        </div>) : (<div>notfound...</div>)}
        </div>
      );
    }
  }
  
  export default withRouter(Supplier);