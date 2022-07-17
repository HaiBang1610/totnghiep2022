import React, { Component } from "react";

import ProductDataService from "../services/product.service";
import SupplierDataService from "../services/supplier.service";

import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField";

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
      navigate={navigate}
      // etc...
    />
  );
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage=this.onChangeImage.bind(this);
    this.onChangeSupplier_name=this.onChangeSupplier_name.bind(this);
    this.onChangeAmount=this.onChangeAmount.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    this.onChangeCategory=this.onChangeCategory.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.state = {
      suppliers: [],
      id: null,
      name: "",
      name_checked:"",
      description: "", 
      outstock: false,
      image: "",
      supplier_name: "",
      supplier_id: null,
      amount: "",
      price: "",
      category: "",
      submitted: false,
      name_message: "",
      currentUser: false,
    };
  }
  componentDidMount() {
    this.retrieveSuppliers();
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
  retrieveSuppliers() {
    SupplierDataService.getAll()
      .then(response => {
        this.setState({
          suppliers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  checkProductExisted() {
    var name = this.state.name_checked;
      ProductDataService.getName(name)
        .then(response => {
          this.setState({
            name_message: "Tên sản phẩm này đã tồn tại. Vui lòng nhập tên khác",
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
  onChangeName(e) {
    this.setState({
      name_checked: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
    this.checkProductExisted()
  }
  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
    this.checkProductExisted()
  }
  onChangeSupplier_name(e, value) {
    //console.log(value)
    this.setState({
      supplier_name: value
    });
    SupplierDataService.getName(value)
    .then(response => {
      this.setState({
        supplier_id: response.data.supplier_id,
      });
    })
    .catch(e => {
      console.log(e);
    })
    this.checkProductExisted()
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
    this.checkProductExisted()
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
    this.checkProductExisted()
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
    this.checkProductExisted()
  }
  saveProduct() {  
    var data = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      supplier_id: this.state.supplier_id,
      amount: this.state.amount,
      price: this.state.price,
      category: this.state.category
    };
    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          outstock: response.data.outstock,
          image: response.data.image,
          supplier_id: response.data.supplier_id,
          amount: response.data.amount,
          price: response.data.price,
          category: response.data.category,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newProduct() {
    this.setState({
      id: null,
      name: "",
      description: "",
      outstock: false,
      image: "",
      supplier_id: "",
      amount: "",
      price: "",
      category: "",
      submitted: false
    });
  }
  validationSchema(){
    return Yup.object().shape(
      {
        name: Yup.string().required("Tên sản phẩm là bắt buộc"),
        description: Yup.string().required("Thông tin chi tiết là bắt buộc"),
        supplier_name: Yup.string().required("Nhà cung cấp là bắt buộc").nullable(true),
        amount: Yup.number().required("Số lượng là bắt buộc").positive("Số lượng sản phẩm ko thể nhỏ hơn 0 và mặc định là còn hàng.").integer("Số lượng sản phẩm không thể là số thập phân."),
        price: Yup.number().required("Giá sản phẩm là bắt buộc").positive("Giá sản phẩm ko thể là giá trị âm.").integer("Giá sản phẩm không thể là số thập phân.").min(1000,"Giá tối thiểu 1000 VND"),
        category: Yup.string().required("Loại sản phẩm là bắt buộc")
      }
    )
  }
  render() {
    const{suppliers, currentUser} =this.state;
    const initialValues = {
      name: this.state.name_checked,
      description: this.state.description,
      supplier_name: this.state.supplier_name,
      amount: this.state.amount,
      price: this.state.price,
      category: this.state.category,
    };
    return (
      <div>
        {currentUser ?
        (<div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Thêm sản phẩm thành công!</h4>
              <button className="btn btn-success" onClick={this.newProduct}>
                <i class="bi bi-plus-circle text-light"></i>
                {" "}Tiếp tục thêm
              </button>
              <Link to="/products">
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
                onSubmit={this.saveProduct}
                enableReinitialize={true}
              >
              {({resetForm}) =>{
                return(
              <Form>
              <div className="form-group">
                <label htmlFor="name">Tên sản phẩm</label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  
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
                <label htmlFor="image">Đường dẫn ảnh (Không bắt buộc)</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  
                  value={this.state.image}
                  onChange={this.onChangeImage}
                  name="image"
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplier_name"></label>
                <Field
                  //disablePortal
                  component={Autocomplete}
                  name="supplier_name"
                  options={suppliers}
                  getOptionLabel={(option) => option.supplier_name}
                  //value={this.state.supplier_name}
                  onInputChange={this.onChangeSupplier_name}
                  sx={{ width: 500 }}
                  renderInput={(params) => <TextField {...params} label="Nhà cung cấp" placeholder="Vui lòng điền tên nhà cung cấp" />}
                />          
                <ErrorMessage
                  name="supplier_name"
                  component="div"
                  className="text-danger"
                />
                {/*<input
                  type= "text"
                  disabled= "true"
                  value={this.state.supplier_id}
                >
                </input>*/}
              </div>
              <div className="form-group">
                <label htmlFor="amount">Số lượng</label>
                <Field
                  type="number"
                  className="form-control"
                  id="amount"
                  
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                  name="amount"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá sản phẩm (VND)</label>
                <Field
                  type="number"
                  className="form-control"
                  id="price"
                  
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Category">Loại sản phẩm (food, drink, ...)</label>
                <Field 
                  type="text"
                  className="form-control"
                  id="category"                 
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  name="category"
                >
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button type="button" className="badge bg-success" data-bs-toggle="modal" data-bs-target="#add">
                Thêm
              </button>

              {/*Modal*/}
          <div class="modal fade" id="add" tabindex="-1" aria-labelledby="addLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addLabel">Xác nhận thêm sản phẩm!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Bạn có chắc chắn muốn thêm sản phẩm này không?
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

              {/*<button type="button" onClick={resetForm} className="btn btn-warning float-right">
                Reset
              </button>*/}
              <button onClick={() => this.props.navigate(`/products`)} className="badge bg-danger mr-2">
                Trở lại
              </button>
              </Form>
              )}}
              </Formik>
            </div>
          )}
        </div>) : (<div>notfound...</div>)}
        </div>
      );
  
  }
}

export default withRouter(AddProduct)