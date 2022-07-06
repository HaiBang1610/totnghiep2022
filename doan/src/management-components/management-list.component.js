import React, { Component } from "react";
import ManagementDataService from "../services/management.service"
import { Link} from "react-router-dom";
import moment from "moment-timezone";
import DateTimePicker from 'react-datetime-picker'

export default class ManagementsList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchName = this.onChangeSearchName.bind(this);
      this.retrieveManagements = this.retrieveManagements.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActiveManagement = this.setActiveManagement.bind(this);
      this.searchName = this.searchName.bind(this);
      this.onChangeDate=this.onChangeDate.bind(this);
      this.searchDate = this.searchDate.bind(this);
      this.searchMonth = this.searchMonth.bind(this);
      this.searchYear = this.searchYear.bind(this);
      this.getPriceDate = this.getPriceDate.bind(this);
      this.getPriceMonth = this.getPriceMonth.bind(this);
      this.getPriceYear = this.getPriceYear.bind(this);
      this.state = {
        management: [],
        currentManagement: null,
        currentIndex: -1,
        searchName: "",
        date:"",
        price:""
      };
    }
    componentDidMount() {
      this.retrieveManagements();
    }
    onChangeSearchName(e) {
      const searchName = e.target.value;
      this.setState({
        searchName: searchName
      });
    }
    onChangeDate(e) {
      var date = moment(e).format("YYYY-MM-DD") 
      this.setState({
        date: new Date(date)
      });
      console.log(this.state.date)
    }
    retrieveManagements() {
        ManagementDataService.getAll()
        .then(response => {
          this.setState({
            managements: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    refreshList() {
      this.retrieveManagements();
      this.setState({
        currentManagement: null,
        currentIndex: -1
      });
    }
    setActiveManagement(management, index) {
      this.setState({
        currentManagement: management,
        currentIndex: index
      });
    }
    searchName() {
        ManagementDataService.findByName(this.state.searchName)
        .then(response => {
          this.setState({
            managements: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    searchDate() {
      var date = moment(this.state.date).format("YYYY-MM-DD")
      ManagementDataService.findByDate(date)
      .then(response => {
        this.setState({
          managements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    searchMonth() {
      var date = moment(this.state.date).format("YYYY-MM")
      ManagementDataService.findByDate(date)
      .then(response => {
        this.setState({
          managements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    searchYear() {
      var date = moment(this.state.date).format("YYYY")
      ManagementDataService.findByDate(date)
      .then(response => {
        this.setState({
          managements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    getPriceDate() {
      var date = moment(this.state.date).format("YYYY-MM-DD")
      ManagementDataService.getTotalPrice(date)
      .then(response => {
        this.setState({
          price: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    getPriceMonth() {
      var date = moment(this.state.date).format("YYYY-MM")
      ManagementDataService.getTotalPrice(date)
      .then(response => {
        this.setState({
          price: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    getPriceYear() {
      var date = moment(this.state.date).format("YYYY")
      ManagementDataService.getTotalPrice(date)
      .then(response => {
        this.setState({
          price: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    render() {
      const { searchName, managements, currentManagement, currentIndex } = this.state;
      return (
        <div className="list row">
          {/*Search Bar---------------------------------------------------------------*/}
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên sản phẩm"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={this.searchName}
                >
                  <i class="bi bi-search"></i>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          {/*Management List-----------------------------------------------------------------------*/}
          <div className="col-md-6">
            <h4>Danh sách đơn hàng {""}
              <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
                <i class="bi bi-arrow-clockwise"></i>
              </button>
              <text>{" "}</text>
              <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#dateSearch">
                <i class="bi bi-calendar"></i>
              </button>
              {/*Modal dateSearch */}
              <div class="modal fade" id="dateSearch" tabindex="-1" aria-labelledby="dateSearchLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="dateSearchLabel">Lọc đơn hàng theo thời gian bán</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <DateTimePicker
                        className="form-control"
                        format="y-MM-dd"
                        clearIcon={null}
                        value={this.state.date}
                        onChange={this.onChangeDate}
                      ></DateTimePicker>
                    </div>
                    <div class="modal-footer">
                      <button className="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={this.searchDate}>
                        <i class="bi bi-arrow-clockwise"></i>
                        {" "}Lọc theo ngày
                      </button>
                      <button className="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={this.searchMonth}>
                        <i class="bi bi-arrow-clockwise"></i>
                        {" "}Lọc theo tháng
                      </button>
                      <button className="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={this.searchYear}>
                        <i class="bi bi-arrow-clockwise"></i>
                        {" "}Lọc theo năm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <text>{" "}</text>
              <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#datePrice">
                <i class="bi bi-currency-dollar"></i>
              </button>
              {/*Modal datePrice */}
              <div class="modal fade" id="datePrice" tabindex="-1" aria-labelledby="datePriceLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="dateSearchLabel">Tính tổng giá tiền theo thời gian bán</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <DateTimePicker
                        className="form-control"
                        format="y-MM-dd"
                        clearIcon={null}
                        value={this.state.date}
                        onChange={this.onChangeDate}
                      ></DateTimePicker>
                      <div className="form-group">
                        <label htmlFor="total_price">Tổng giá tiền (VND)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="total_price"
                          value={this.state.price.total_price}
                          name="total_price"
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button className="m-3 btn btn-sm btn-success" onClick={this.getPriceDate}>
                        Tính theo ngày
                      </button>
                      <button className="m-3 btn btn-sm btn-success" onClick={this.getPriceMonth}>
                        Tính theo tháng
                      </button>
                      <button className="m-3 btn btn-sm btn-success" onClick={this.getPriceYear}>
                        Tính theo năm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/addManagement">
                <button className="btn btn-sm btn-primary">
                  <i class="bi bi-plus-circle text-light"></i>
                  {" "}Thêm đơn hàng
                </button>
            </Link>
            </h4>
            <ul className="list-group">
              {managements &&
                managements.map((management, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveManagement(management, index)}
                    key={index}
                  >
                    {management.product_name} - {moment(management.datetime).format("YYYY-MM-DD")}
                  </li>
                ))}
            </ul>
          </div>
          {/*Management Detail--------------------------------------------------------------------*/}
          <div className="col-md-6">
            {currentManagement ? (
              <div>
                <h4>Đơn hàng</h4>
                <div>
                  <label>
                    <strong>Tên sản phẩm:</strong>
                    {" "}{currentManagement.product_name}
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Số lượng bán ra:</strong>
                    {" "}{currentManagement.sell_amount}
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Tổng giá tiền:</strong>
                    {" "}{currentManagement.total_price}{" VND"}
                  </label>                      
                </div>
                <div>
                  <label>
                    <strong>Thời gian bán:</strong>
                    {" "}{moment(currentManagement.datetime).format("YYYY-MM-DD HH:mm:ss")}
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <br />
                <p>Vui lòng chọn một đơn hàng trong danh sách...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }