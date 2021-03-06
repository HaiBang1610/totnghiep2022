import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import SupplierDataService from "../services/supplier.service";
import { useParams } from "react-router-dom";
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
    this.onChangeSupplier_name=this.onChangeSupplier_name.bind(this);
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
        supplier_name:"",
        amount: "",
        price: "",
        category: "",
        currentUser: false,
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
  onChangeSupplier_name(e, value) {   
    SupplierDataService.getName(value)
    .then(response => {
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        supplier_id: response.data.supplier_id
      }
    }));
  })
  .catch(e => {
    console.log(e);
  })
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
          message: "Th??ng tin s???n ph???m ???? ???????c c???p nh???t th??nh c??ng!"
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
        //name: Yup.string().required("T??n s???n ph???m l?? b???t bu???c"),
        description: Yup.string().required("Th??ng tin chi ti???t l?? b???t bu???c"),
        supplier_name: Yup.string().required("Nh?? cung c???p l?? b???t bu???c").nullable(true),
        amount: Yup.number().required("S??? l?????ng l?? b???t bu???c").moreThan(-1,"S??? l?????ng s???n ph???m ko th??? l?? gi?? tr??? ??m.").integer("S??? l?????ng s???n ph???m kh??ng th??? l?? s??? th???p ph??n."),
        price: Yup.number().required("Gi?? s???n ph???m l?? b???t bu???c").positive("Gi?? s???n ph???m ko th??? l?? gi?? tr??? ??m.").integer("Gi?? s???n ph???m kh??ng th??? l?? s??? th???p ph??n.").min(1000,"Gi?? t???i thi???u 1000 VND"),
        category: Yup.string().required("Lo???i s???n ph???m l?? b???t bu???c")
      }
    )
  }
  render() {
    const { currentProduct, suppliers, currentUser } = this.state;
    const initialValues = {
      //name: this.state.name_checked,
      description: currentProduct.description,
      supplier_name: currentProduct.supplier_name,
      amount: currentProduct.amount,
      price: currentProduct.price,
      category: currentProduct.category,
    };
    return (
      <div>
      {currentUser ?
      (<div className="edit-form">
        {currentProduct.id ? (
          <div>
            <h4>S???n ph???m</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.updateProduct}
                enableReinitialize={true}
              >
            <Form>
              <div className="form-group">
                <label htmlFor="name">T??n</label>
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
                <label htmlFor="description">Th??ng tin chi ti???t</label>
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
                <label htmlFor="image">???????ng d???n ???nh</label>
                <textarea
                  className="form-control"
                  id="image"
                  value={currentProduct.image}
                  onChange={this.onChangeImage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplier_name">Nh?? cung c???p hi???n t???i: {currentProduct.supplier_name}</label>
                <Field
                  //disablePortal
                  component={Autocomplete}
                  name="supplier_name"
                  options={suppliers}
                  getOptionLabel={(option) => option.supplier_name}
                  //inputValue={currentProduct.supplier_name}
                  onInputChange={this.onChangeSupplier_name}
                  sx={{ width: 500 }}
                  renderInput={(params) => <TextField {...params} placeholder="Vui l??ng ??i???n t??n nh?? cung c???p n???u c???n c???p nh???t!"/>}
                />          
              </div>
              <div className="form-group">
                <label htmlFor="amount">S??? l?????ng</label>
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
                <label htmlFor="price">Gi?? s???n ph???m (VND)</label>
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
                <label htmlFor="Category">Lo???i s???n ph???m (food, drink, ...)</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentProduct.category}
                  onChange={this.onChangeCategory}
                >
                </input>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>T??nh tr???ng:</strong>
                </label>
                {currentProduct.outstock ? "H???t h??ng" : "C??n h??ng"}
              </div>
              <p style={{color:"red"}}>{this.state.outstock_message}</p>
              {currentProduct.outstock ? (
              <button
                type="button"
                className="badge bg-primary mr-2"
                onClick={() => this.updateOutstock(false)}
              >
                C??n h??ng
              </button>
            ) : (
              <button
              type="button"
                className="badge bg-primary mr-2"
                onClick={() => this.updateOutstock(true)}
              >
                H???t h??ng
              </button>
            )}
            <text>{" "}</text>
            <button
              type="button"
              className="badge bg-danger mr-2"
              //onClick={this.deleteProduct}
              data-bs-toggle="modal" data-bs-target="#remove"
            >
              X??a
            </button>
            {/*Modal*/}
            <div class="modal fade" id="remove" tabindex="-1" aria-labelledby="removeLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="removeLabel">X??c nh???n x??a s???n ph???m!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  B???n c?? ch???c ch???n mu???n x??a s???n ph???m n??y kh??ng?
                </div>
                <div class="modal-footer">
                  <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button className="m-3 btn btn-sm btn-danger" onClick={this.deleteProduct} data-bs-dismiss="modal">
                    <i class="bi bi-trash text-light"></i>
                    Ti???p t???c
                  </button>
                </div>
              </div>
            </div>
            </div>
            <text>{" "}</text>
            <button
              type="button"
              className="badge bg-success"
              //onClick={this.updateProduct}
              data-bs-toggle="modal" data-bs-target="#update"
            >
              C???p nh???t
            </button>
            {/*Modal*/}
            <div class="modal fade" id="update" tabindex="-1" aria-labelledby="updateLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="updateLabel">X??c nh???n c???p nh???t th??ng tin s???n ph???m!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  B???n c?? ch???c ch???n mu???n c???p nh???t s???n ph???m n??y kh??ng?
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
            <text>{" "}</text>
            <button onClick={() => this.props.navigate(`/products`)} className="badge bg-dark mr-2">
                Tr??? l???i
            </button>
            <p style={{color:"red"}}>{this.state.message}</p>
            </Form>
            </Formik>
            
          </div>
        ) : (
          <div>
            <br />
            <p>S???n ph???m n??y kh??ng t???n t???i!</p>
          </div>
        )}
      </div>) : (<div>notfound...</div>)}
      </div>
    );
  }
}

export default withRouter(Product);