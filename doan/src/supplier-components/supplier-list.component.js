import React, { Component } from "react";
import SupplierDataService from "../services/supplier.service";
import { Link} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

import UserService from "../services/user.service";


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
    const { searchName, suppliers, currentSupplier, currentIndex, currentUser } = this.state;
    return (
      <div>
      {currentUser ?
      (<div className="list row">
        {/*Search Bar---------------------------------------------------------------*/}
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="T??m ki???m theo t??n nh?? cung c???p"
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
                T??m ki???m
              </button>
            </div>
          </div>
        </div>
        {/*Supplier List-----------------------------------------------------------------------*/}
        <div className="col-md-6">
          <h4>Danh s??ch nh?? cung c???p {""}
          <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
            <i class="bi bi-arrow-clockwise"></i>
          </button>
          <div>
          <Link to="/addSupplier">
            <button className="btn btn-sm btn-primary">
              <i class="bi bi-plus-circle text-light"></i>
              {" "}Th??m nh?? cung c???p
            </button>
          </Link>
          </div>
          </h4>
          <Scrollbars autoHeightMax={450} autoHeight>
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
          </Scrollbars>
          {/*<button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSuppliers}
          >
            <i class="bi bi-trash text-light"></i>
            X??a t???t c???
              </button>*/}
        </div>
        {/*Supplier Detail--------------------------------------------------------------------*/}
        <div className="col-md-6">
          {currentSupplier ? (
            <div class="card">
              <h4>Nh?? cung c???p</h4>
              <Link
                to={`/suppliers/${currentSupplier.supplier_id}`}                
              >
                C???p nh???t th??ng tin
              </Link>
              <div>
                <label>
                  <strong>T??n nh?? cung c???p:</strong>
                  {" "}{currentSupplier.supplier_name}
                </label>
              </div>
              <div>
                <label>
                  <strong>Th??ng tin chi ti???t:</strong>
                  {" "}{currentSupplier.supplier_description}
                </label>
              </div>
              <div>
                <label>
                  <strong>S??? ??i???n tho???i:</strong>
                  {" "}{currentSupplier.supplier_phone}
                </label>                      
              </div>
              <div>
                <label>
                  <strong>?????a ch???:</strong>
                  {" "}{currentSupplier.supplier_address}
                </label>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p style={{fontWeight: 'bold'}}>Vui l??ng ch???n m???t nh?? cung c???p trong danh s??ch...</p>
            </div>
          )}
        </div>
      </div>) :(<div>notfound...</div>)}
      </div>
    );
  }
}