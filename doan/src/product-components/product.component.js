import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import SupplierDataService from "../services/supplier.service";
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

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage=this.onChangeImage.bind(this);
    this.onChangeSupplier_id=this.onChangeSupplier_id.bind(this);
    this.onChangeAmount=this.onChangeAmount.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    this.onChangeCategory=this.onChangeCategory.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateOutstock = this.updateOutstock.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      suppliers: [],
      currentProduct: {
        id: null,
        name: "",
        description: "", 
        outstock: false,
        image: "",
        supplier_id: "",
        amount: "",
        price: "",
        category: "",
      },
      message: "",
      outstock_message: "",
    };
  }
  componentDidMount() {
    let { id } = this.props.params;
    //this.getProduct(this.props.match.params.id);
    this.getProduct(id);
    this.retrieveSuppliers();
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
  onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          name: name
        }
      };
    });
  }
  onChangeDescription(e) {
    const description = e.target.value;   
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description
      }
    }));
  }
  onChangeSupplier_id(e) {
    const supplier_id = e.target.value;   
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        supplier_id: supplier_id
      }
    }));
  }
  onChangeAmount(e) {
    const amount = e.target.value;   
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        amount: amount
      }
    }));
  }
  onChangePrice(e) {
    const price = e.target.value;   
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: price
      }
    }));
  }
  onChangeCategory(e) {
    const category = e.target.value;   
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        category: category
      }
    }));
  }
  onChangeImage(e) {
    const image = e.target.value;   
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        image: image
      }
    }));
  }
  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateOutstock(status) {
    var data = {
      id: this.state.currentProduct.id,
      name: this.state.currentProduct.name,
      description: this.state.currentProduct.description,
      image: this.state.currentProduct.image,
      supplier_id: this.state.currentProduct.supplier_id,
      amount: this.state.currentProduct.amount,
      price: this.state.currentProduct.price,
      category: this.state.currentProduct.category,
      outstock: status
    };
    ProductDataService.update(this.state.currentProduct.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProduct: {
            ...prevState.currentProduct,
            outstock: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Thông tin sản phẩm đã được cập nhật thành công!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.navigate('/products')
      })
      .catch(e => {
        console.log(e);
      });
  }
  validationSchema(){
    return Yup.object().shape(
      {
        //name: Yup.string().required("Tên sản phẩm là bắt buộc"),
        description: Yup.string().required("Thông tin chi tiết là bắt buộc"),
        //supplier_id: Yup.string().required("Nhà cung cấp là bắt buộc"),
        amount: Yup.number().required("Số lượng là bắt buộc").moreThan(-1,"Số lượng sản phẩm ko thể là giá trị âm.").integer("Số lượng sản phẩm không thể là số thập phân."),
        price: Yup.number().required("Giá sản phẩm là bắt buộc").positive("Giá sản phẩm ko thể là giá trị âm.").integer("Giá sản phẩm không thể là số thập phân.").min(1000,"Giá tối thiểu 1000 VND"),
        //category: Yup.string().required("Loại sản phẩm là bắt buộc")
      }
    )
  }
  render() {
    const { currentProduct, suppliers } = this.state;
    const initialValues = {
      //name: this.state.name_checked,
      description: currentProduct.description,
      //supplier_id: this.state.supplier_id,
      amount: currentProduct.amount,
      price: currentProduct.price,
      //category: this.state.category,
    };
    return (
      <div className="edit-form">
        {currentProduct.id ? (
          <div>
            <h4>Sản phẩm</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.updateProduct}
                enableReinitialize={true}
              >
            <Form>
              <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  disabled="true"
                  value={currentProduct.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Thông tin chi tiết</label>
                <Field as="textarea"
                  className="form-control"
                  id="description"
                  value={currentProduct.description}
                  onChange={this.onChangeDescription}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Đường dẫn ảnh</label>
                <textarea
                  className="form-control"
                  id="image"
                  value={currentProduct.image}
                  onChange={this.onChangeImage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplier_id">Nhà cung cấp</label>
                <select
                  className="form-control"
                  id="supplier_id"
                  value={currentProduct.supplier_id}
                  onChange={this.onChangeSupplier_id}
                >
                  {suppliers.map(({supplier_id,supplier_name}, index) =>
                    {return <option value={supplier_id}>{supplier_name}</option>}
                  )}           
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Số lượng</label>
                <Field
                  type="number"
                  className="form-control"
                  id="amount"
                  value={currentProduct.amount}
                  onChange={this.onChangeAmount}
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
                  value={currentProduct.price}
                  onChange={this.onChangePrice}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Category">Loại sản phẩm</label>
                <select
                  className="form-control"
                  id="category"
                  value={currentProduct.category}
                  onChange={this.onChangeCategory}
                >
                  <option value={'food'}>food</option>
                  <option value={'drink'}>drink</option>
                  <option value={'cigratte'}>cigratte</option>
                  <option value={'other'}>other</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  <strong>Tình trạng:</strong>
                </label>
                {currentProduct.outstock ? "Hết hàng" : "Còn hàng"}
              </div>
              <p style={{color:"red"}}>{this.state.outstock_message}</p>
              {currentProduct.outstock ? (
              <button
                type="button"
                className="badge bg-primary mr-2"
                onClick={() => this.updateOutstock(false)}
              >
                Còn hàng
              </button>
            ) : (
              <button
              type="button"
                className="badge bg-primary mr-2"
                onClick={() => this.updateOutstock(true)}
              >
                Hết hàng
              </button>
            )}
            <button
              type="button"
              className="badge bg-danger mr-2"
              //onClick={this.deleteProduct}
              data-bs-toggle="modal" data-bs-target="#remove"
            >
              Xóa
            </button>
            {/*Modal*/}
            <div class="modal fade" id="remove" tabindex="-1" aria-labelledby="removeLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="removeLabel">Xác nhận xóa sản phẩm!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Bạn có chắc chắn muốn xóa sản phẩm này không?
                </div>
                <div class="modal-footer">
                  <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteProduct} data-bs-dismiss="modal">
                    <i class="bi bi-trash text-light"></i>
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
            </div>

            <button
              type="button"
              className="badge bg-success"
              //onClick={this.updateProduct}
              data-bs-toggle="modal" data-bs-target="#update"
            >
              Cập nhật
            </button>
            {/*Modal*/}
            <div class="modal fade" id="update" tabindex="-1" aria-labelledby="updateLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="updateLabel">Xác nhận cập nhật thông tin sản phẩm!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Bạn có chắc chắn muốn cập nhật sản phẩm này không?
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

            <button onClick={() => this.props.navigate(`/products`)} className="badge bg-dark mr-2">
                Trở lại
            </button>
            <p style={{color:"red"}}>{this.state.message}</p>
            </Form>
            </Formik>
            
          </div>
        ) : (
          <div>
            <br />
            <p>Sản phẩm này không tồn tại!</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Product);