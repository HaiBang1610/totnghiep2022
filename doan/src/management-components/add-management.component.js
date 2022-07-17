import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import ManagementDataService from "../services/management.service";
import { Link} from "react-router-dom";
import DateTimePicker from 'react-datetime-picker'
import moment from "moment-timezone";
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

class AddManagement extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeAmount=this.onChangeAmount.bind(this);
      this.onChangePrice=this.onChangePrice.bind(this);
      this.onChangeDatetime=this.onChangeDatetime.bind(this);
      this.saveManagement = this.saveManagement.bind(this);
      this.newManagement = this.newManagement.bind(this);
      this.state = {
        products: [],
        product: {
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
        product_amount: "",
        id: null,
        product_name: "",
        sell_amount: "", 
        total_price: "",
        datetime: "",
        submitted: false,
        currentUser: false,
        amount_message: ""
      };
    }
    componentDidMount() {
      this.retrieveStockProducts();
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
    retrieveStockProducts() {
      ProductDataService.findAllStock()
        .then(response => {
          this.setState({
            products: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    onChangeName(e, value) {
      this.setState({
        product_name: value
      });
    }
    onChangeAmount(e) {
      this.setState({
        sell_amount: e.target.value,
        total_price: ""
      });
      this.retrieveOneProducts();
    }
    retrieveOneProducts() {
      var name = this.state.product_name;
        ProductDataService.getName(name)
          .then(response => {
            this.setState({
              product: response.data,
              //product: {amount: response.data.amount-this.state.sell_amount}
            });
            //console.log(this.state.product.amount);
          })
          .catch(e => {
            console.log(e);
          });
    }
    onChangePrice(e) {
      var math = this.state.product.amount - this.state.sell_amount
      if(math > 0)
      {this.setState(prevState =>({
        total_price: this.state.product.price*this.state.sell_amount,
        product: {...prevState.product, amount: this.state.product.amount-this.state.sell_amount},
        amount_message: ""
      }));}
      else if(math === 0) 
        {this.setState(prevState =>({
          total_price: this.state.product.price*this.state.sell_amount,
          product: {...prevState.product, amount: this.state.product.amount-this.state.sell_amount, outstock: true},
          amount_message: ""
        }));
      }
      else {
        this.setState({
          total_price: "",
          amount_message: "Số lượng bán ra vượt quá số lượng hiện tại."
        });
      }
      
    }
    onChangeDatetime(e) {
      var date = moment(e).format("YYYY-MM-DD HH:mm:ss")
      this.setState({
        datetime: new Date(date)
      });
      //console.log(this.state.datetime)
     // console.log(this.state.product)
    }
    saveManagement() {
      var data = {
        product_name: this.state.product_name,
        sell_amount: this.state.sell_amount,
        total_price: this.state.total_price,
        datetime: moment(this.state.datetime).format("YYYY-MM-DD HH:mm:ss"),
      };
      console.log(data)
      ManagementDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            product_name: response.data.product_name,
            sell_amount: response.data.sell_amount,
            total_price: response.data.total_price,
            datetime: response.data.datetime,
            submitted: true,
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        ProductDataService.update(
          this.state.product.id,
          this.state.product
        )
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    newManagement() {
      this.setState({
        id: null,
        product_name: "",
        sell_amount: "",
        total_price: "",
        datetime: "",
        submitted: false
      });
    }
    validationSchema(){
      return Yup.object().shape(
        {
          product_name: Yup.string().required("Tên sản phẩm là bắt buộc.").nullable(true),
          datetime: Yup.string().required("Vui lòng chọn thời gian sản phẩm được bán"),
          sell_amount: Yup.number().required("Số lượng là bắt buộc").positive("Số lượng sản phẩm ko thể nhỏ hơn 0").integer("Số lượng sản phẩm không thể là số thập phân."),
          total_price: Yup.number().required("Vui lòng tính tổng giá bằng cách nhấn vào nút bên cạnh tiêu đề."),
        }
      )
    }
    render() {
      const{products, currentUser} =this.state;
      const initialValues = {
        product_name: this.state.product_name,
        datetime: this.state.datetime,
        sell_amount: this.state.sell_amount,
        total_price: this.state.total_price,
      };
      return (
        <div>
          {currentUser ?
          (<div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Thêm đơn hàng thành công!</h4>
                <button className="btn btn-success" onClick={this.newManagement}>
                  <i class="bi bi-plus-circle text-light"></i>
                  {" "}Tiếp tục thêm
                </button>
                <Link to="/managements">
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
                  onSubmit={this.saveManagement}
                  enableReinitialize={true}
                >
                <Form>
                <div className="form-group">
                <label htmlFor="product_name">Tên sản phẩm</label>
                <Field
                  //disablePortal
                  component={Autocomplete}
                  name="product_name"
                  options={products}
                  getOptionLabel={(option) => option.name}
                  //value={this.state.supplier_name}
                  onInputChange={this.onChangeName}
                  sx={{ width: 500 }}
                  renderInput={(params) => <TextField {...params} placeholder="Vui lòng điền tên sản phẩm" />}
                /> 
                <ErrorMessage
                  name="product_name"
                  component="div"
                  className="text-danger"
                />
                </div>
                {/*<div className="form-group">
                  <label>Số lượng sản phẩm hiện tại</label>
                  <input
                    type="text"
                    disabled="true"
                    value={this.state.product.amount}
                  >
                  </input>
                </div>*/}
                <div className="form-group">
                  <label htmlFor="sell_amount">Số lượng bán ra</label>
                  <Field
                    type="number"
                    className="form-control"
                    id="sell_amount"
                    //required
                    value={this.state.sell_amount}
                    onChange={this.onChangeAmount}
                    name="sell_amount"
                  />
                  <ErrorMessage
                  name="sell_amount"
                  component="div"
                  className="text-danger"
                />
                </div>
                {/*<button onClick={this.onChangePrice}>Tính tổng giá</button>*/}
                <div className="form-group">
                  <label htmlFor="total_price">Tổng giá tiền (VND) {" "}
                    <button type="button" className="btn btn-secondary btn-sm" onClick={this.onChangePrice}>
                      <i class="bi bi-calculator"></i>
                    </button>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="total_price"
                    //required
                    value={this.state.total_price}
                    //onChange={this.onChangePrice}
                    name="total_price"
                    readOnly={true}
                  />
                  <ErrorMessage
                  name="total_price"
                  component="div"
                  className="text-danger"
                />
                </div>
                <p style={{color:"red"}}>{this.state.amount_message}</p>
                <div className="form-group">
                  <label htmlFor="datetime">Thời gian bán</label>
                  <DateTimePicker
                    className="form-control"
                    id="datetime"
                    format="y-MM-dd HH:mm:ss a"
                    clearIcon={null}
                    //required
                    value={this.state.datetime}
                    onChange={this.onChangeDatetime}
                    name="datetime"
                  ></DateTimePicker>
                  <ErrorMessage
                  name="datetime"
                  component="div"
                  className="text-danger"
                />
                </div>
                <div><label></label></div>
                <button 
                  type="button" 
                  //onClick={this.saveManagement} 
                  className="badge bg-success"
                  data-bs-toggle="modal" data-bs-target="#add"
                  >
                  Thêm
                </button>
                 {/*Modal*/}
                 <div class="modal fade" id="add" tabindex="-1" aria-labelledby="addLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="addLabel">Xác nhận thêm đơn hàng!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                    <div class="modal-body">
                      Bạn có chắc chắn muốn thêm đơn hàng này không?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button button className="m-3 btn btn-sm btn-success" type="submit" data-bs-dismiss="modal">
                      <i class="bi bi-plus-circle text-light"></i>
                      {" "}Tiếp tục
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              <text>{" "}</text>
                <button onClick={() => this.props.navigate(`/managements`)} className="badge bg-danger mr-2">
                Trở lại
              </button>
              </Form>
              </Formik>
              </div>
            )}
          </div>) :(<div>notfound...</div>)}
        </div>
        );
    
    }
  }

  export default withRouter(AddManagement)