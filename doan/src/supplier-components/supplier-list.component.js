import React, { Component } from "react";
import SupplierDataService from "../services/supplier.service";
import { Link} from "react-router-dom";


export default class SuppliersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSuppliers = this.retrieveSuppliers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSupplier = this.setActiveSupplier.bind(this);
    this.removeAllSuppliers = this.removeAllSuppliers.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      supplier: [],
      currentSupplier: null,
      currentIndex: -1,
      searchName: "",
    };
  }
  componentDidMount() {
    this.retrieveSuppliers();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
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
  refreshList() {
    this.retrieveSuppliers();
    this.setState({
      currentSupplier: null,
      currentIndex: -1
    });
  }
  setActiveSupplier(supplier, index) {
    this.setState({
      currentSupplier: supplier,
      currentIndex: index
    });
  }
  removeAllSuppliers() {
    SupplierDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    SupplierDataService.findByName(this.state.searchName)
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
  render() {
    const { searchName, suppliers, currentSupplier, currentIndex } = this.state;
    return (
      <div className="list row">
        {/*Search Bar---------------------------------------------------------------*/}
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên nhà cung cấp"
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
        {/*Supplier List-----------------------------------------------------------------------*/}
        <div className="col-md-6">
          <h4>Danh sách nhà cung cấp {""}
          <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
            <i class="bi bi-arrow-clockwise"></i>
          </button>
          <Link to="/addSupplier">
            <button className="btn btn-sm btn-primary">
              <i class="bi bi-plus-circle text-light"></i>
              {" "}Thêm nhà cung cấp
            </button>
          </Link>
          </h4>
          <ul className="list-group">
            {suppliers &&
              suppliers.map((supplier, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSupplier(supplier, index)}
                  key={index}
                >
                  {supplier.supplier_name}
                </li>
              ))}
          </ul>
          {/*<button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSuppliers}
          >
            <i class="bi bi-trash text-light"></i>
            Xóa tất cả
              </button>*/}
        </div>
        {/*Supplier Detail--------------------------------------------------------------------*/}
        <div className="col-md-6">
          {currentSupplier ? (
            <div>
              <h4>Nhà cung cấp</h4>
              <Link
                to={`/suppliers/${currentSupplier.supplier_id}`}                
              >
                Cập nhật thông tin
              </Link>
              <div>
                <label>
                  <strong>Tên nhà cung cấp:</strong>
                  {" "}{currentSupplier.supplier_name}
                </label>
              </div>
              <div>
                <label>
                  <strong>Thông tin chi tiết:</strong>
                  {" "}{currentSupplier.supplier_description}
                </label>
              </div>
              <div>
                <label>
                  <strong>Số điện thoại:</strong>
                  {" "}{currentSupplier.supplier_phone}
                </label>                      
              </div>
              <div>
                <label>
                  <strong>Địa chỉ:</strong>
                  {" "}{currentSupplier.supplier_address}
                </label>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Vui lòng chọn một nhà cung cấp trong danh sách...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}