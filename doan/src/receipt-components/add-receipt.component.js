import React, { Component } from "react";
import ManagementDataService from "../services/management.service";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

import UserService from "../services/user.service";

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

class AddReceipt extends Component{
    constructor(props) {
        super(props);
        this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
        this.onChangeShopName = this.onChangeShopName.bind(this);
        this.onChangeManagementChoose=this.onChangeManagementChoose.bind(this);
        //this.onChangePrice=this.onChangePrice.bind(this);
        //this.onChangeCreatedTime=this.onChangeCreatedtime.bind(this);
        this.state ={
            customer_name: "",
            shop_name: "",
            //price: "",
            //createdTime: "",
            sale_managements: [],
            sale_managements_choose: [],
            currentUser: false,
            createTime: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        }
    }

    componentDidMount() {
        this.retrieveManagements();
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

    retrieveManagements() {
        ManagementDataService.getAll()
        .then(response => {
          this.setState({
            sale_managements: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    onChangeCustomerName(e) {
        this.setState({
          customer_name: e.target.value
        });
    }
    onChangeShopName(e) {
      this.setState({
        shop_name: e.target.value
      });
  }
    //onChangePrice(e) {
    //    this.setState({
    //      price: e.target.value
    //    });
    //}
    //onChangeCreatedTime(e) {
    //    this.setState({
    //      createdTime: e.target.value
    //    });
    //}
    onChangeManagementChoose(e, value) {
        this.setState({
          sale_managements_choose: value
        });
        console.log(this.state.sale_managements_choose)
    }


    render() {
        const {sale_managements, currentUser} =this.state
        const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
        const checkedIcon = <CheckBoxIcon fontSize="small" />;
        return(
            <div>
                {currentUser ?
                (
                    <div className="submit-form">
                      <h4 className="text-center">Thông tin hóa đơn</h4>
                            <div className="form-group">
                                <label htmlFor="customer_name">Tên người mua</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customer_name"
                                    //required
                                    value={this.state.customer_name}
                                    onChange={this.onChangeCustomerName}
                                    name="customer_name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="shop_name">Tên cửa hàng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="shop_name"
                                    //required
                                    value={this.state.shop_name}
                                    onChange={this.onChangeShopName}
                                    name="shop_name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Thời gian</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="time"
                                    //required
                                    value={moment(new Date()).format("YYYY-MM-DD HH:mm")}
                                    //onChange={this.onChangeCustomerName}
                                    name="time"
                                    disabled="true"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sale_managements_choose"></label>
                                <Autocomplete
                                  multiple
                                  name="sale_managements_choose"
                                  options={sale_managements}
                                  disableCloseOnSelect
                                  getOptionLabel={(option) => option.product_name + moment(option.datetime).format("YYYY/MM/DD HH:mm")}
                                  onChange={this.onChangeManagementChoose}
                                  renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                      <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                      />
                                      {option.product_name + " ------- " +moment(option.datetime).format("YYYY/MM/DD HH:mm")}
                                    </li>
                                  )}
                                  style={{ width: 500 }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Đơn hàng" placeholder="Chọn đơn hàng" />
                                  )}
                                />
                            </div>
                            <div><label></label></div>
                            <button type="button" className="badge bg-success" onClick={() => this.props.navigate(`/Receipt`,{state: this.state})}>Tiếp tục</button>
                            <text>{" "}</text>
                            <button type="button" className="badge bg-danger" onClick={() => this.props.navigate(`/managements`)}>Trở lại</button>
                    </div>
                ) : (<div>notfound...</div>)}
            </div>
        )
    }
}

export default withRouter(AddReceipt)