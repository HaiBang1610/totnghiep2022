import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link} from "react-router-dom";
import noImage from "../image/no_image.jpg"
import Scrollbars from "react-custom-scrollbars-2";
import LinesEllipsis from 'react-lines-ellipsis'
// eslint-disable-next-line no-unused-vars
import { Modal } from "bootstrap";

import UserService from "../services/user.service";


export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);
    //this.onChangeSearchOutstock = this.onChangeSearchOutstock.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.searchName = this.searchName.bind(this);
    this.searchCategory = this.searchCategory.bind(this);
    this.searchOutstock = this.searchOutstock.bind(this);
    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchName: "",
      searchCategory: "",
      currentUser: false,
      categories: [],
      //searchOutstock:""
    };
    this.ref = React.createRef()
  }
  componentDidMount() {
    this.retrieveProducts();
    this.retrieveCategories();
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
  onChangeSearchCategory(e) {
    const searchCategory = e.target.value;
    this.setState({
      searchCategory: searchCategory
    });
  }
  //onChangeSearchOutstock(e) {
  //  const searchOutstock = e.target.value;
  //  this.setState({
  //    searchOutstock: searchOutstock
  //  });
  //}
  retrieveProducts() {
    ProductDataService.getAll()
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
  retrieveCategories() {
    ProductDataService.findAllCategories()
      .then(response => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }
  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }
  removeAllProducts() {
    ProductDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    ProductDataService.findByName(this.state.searchName)
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
  searchCategory() {
    ProductDataService.findByCategory(this.state.searchCategory)
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
  searchOutstock() {
    ProductDataService.findAllOutStock()
      .then(response => {
        this.setState({
          products: response.data
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { categories, searchName, searchCategory, products, currentProduct, currentIndex, currentUser } = this.state;
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
        <div className="col-md-8">
          <h6>Loại sản phẩm{" "}
          <select
            value= {searchCategory}
            onChange ={this.onChangeSearchCategory}
          >
            {categories.map((item, index) => {return<><option value={item.category}>{item.category}</option></>})}
            <option value="" disabled="true" hidden="true">Chọn</option>
          </select>
          <text>{" "}</text>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={this.searchCategory}
              >
                <i class="bi bi-filter"></i>
                Lọc
              </button>
          </h6>
        </div>
        {/*Product List-----------------------------------------------------------------------*/}
        <div className="col-md-6">
          <h4>Danh sách sản phẩm {""}
          <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#detail">
              <i class="bi bi-question-lg"></i>
            </button>
            {/*Modal detail */}
            <div class="modal fade" id="detail" tabindex="-1" aria-labelledby="detailLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="detailLabel">Nhận biết tình trạng hiện tại của sản phẩm qua màu sắc</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <p style={{color:"red"}}>Sản phẩm này đã hết hàng!</p>
                <p style={{color:"blue"}}>Sản phẩm này cần cập nhật lại tình trạng hoặc số lượng!</p>
                <p>Sản phẩm này vẫn còn hàng!</p>
                </div>
              </div>
            </div>
          </div>
            <text>{" "}</text>
            <button className="btn btn-secondary btn-sm" onClick={this.refreshList}>
              <i class="bi bi-arrow-clockwise"></i>
            </button>
            <text>{" "}</text>
            <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={this.searchOutstock}
              >
                Hết hàng
            </button>
          </h4>
          <h4>
            <Link to="/add">
              <button className="btn btn-sm btn-primary">
                <i class="bi bi-plus-circle text-light"></i>
                {" "}Thêm sản phẩm
              </button>
            </Link>
            <text>{" "}</text>
            <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#removeAll">
              <i class="bi bi-trash text-light"></i>
              Xóa tất cả
              </button>
          {/*Remove All Modal*/}
            <div class="modal fade" id="removeAll" tabindex="-1" aria-labelledby="removeAllLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="removeAllLabel">Xác nhận xóa!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Bạn có chắc chắn muốn xóa tất cả sản phẩm không?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="m-3 btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllProducts} >
                    <i class="bi bi-trash text-light"></i>
                    Tiếp tục
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </h4>
          <Scrollbars autoHeightMax={450} autoHeight>
          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.amount === "0" 
                    ? product.outstock 
                          ? <div className="d-flex justify-content-between" style={{color:"red"}}>{product.name} <span className="badge bg-danger rounded-pill">{product.amount}</span></div> 
                          : <div className="d-flex justify-content-between" style={{color:"blue"}}>{product.name} <span className="badge bg-primary rounded-pill">Cần cập nhật</span></div>
                    : product.outstock 
                          ? <div className="d-flex justify-content-between" style={{color:"blue"}}>{product.name} <span className="badge bg-primary rounded-pill">Cần cập nhật</span></div> 
                          : <div className="d-flex justify-content-between">{product.name} <span className="badge bg-success rounded-pill">{product.amount}</span></div>
                  }
                </li>
              ))}
          </ul>
          </Scrollbars>         
        </div>
        {/*Product Detail--------------------------------------------------------------------*/}
        <div className="col-md-6">
          {currentProduct ? (
            <div class="card">
              <h4>{currentProduct.name}</h4>
              <div>
                {currentProduct.image ? (
                <img src={currentProduct.image} alt="display" width="200" height="200" />
                ) : (
                <img src={noImage} alt="display" width="200" height="200"/> 
                )}
              </div>
              <Link
                to={`/products/${currentProduct.id}`}
                
              >
                Cập nhật thông tin
              </Link>
              <div>
                <label>
                  <strong>Nhà cung cấp:</strong>
                  {" "}{currentProduct.supplier_name}
                </label>
              </div>
              <div>
                <label>
                  <strong>Thông tin chi tiết:</strong>
                  <LinesEllipsis text={currentProduct.description} maxLine='2' ellipsis='...' trimRight basedOn='letters'>
                  </LinesEllipsis>
                </label>
              </div>
              <div>
                <label>
                  <strong>Phân loại:</strong>
                  {" "}{currentProduct.category}
                </label>                      
              </div>
              <div>
                {currentProduct.amount !=="0"  
                  ? <label>
                      <strong>Số lượng:</strong>
                      {" "}{currentProduct.amount}
                    </label>   
                  : <label style={{color:"red"}}>
                      <strong>Số lượng:</strong>
                      {" "}{currentProduct.amount}
                    </label>
                }
              </div>
              <div>
                <label>
                  <strong>Giá:</strong>
                  {" "}{currentProduct.price} VND
                </label>
              </div>
              <div>
                {currentProduct.outstock
                  ? <label style={{color:"red"}}>
                      <strong>Tình trạng hàng:</strong>
                      {" "}{"Hết hàng"}
                    </label>
                  : <label>
                      <strong>Tình trạng hàng:</strong>
                      {" "}{"Còn hàng"}
                    </label>               
                }
              </div>
              <div>
                  {currentProduct.amount === "0" 
                    ? currentProduct.outstock ? <></> : <label style={{color:"red"}}>{" "}Cần được cập nhật lại tình trạng hoặc số lượng!</label>
                    : currentProduct.outstock ? <label style={{color:"red"}}>{" "}Cần được cập nhật lại tình trạng hoặc số lượng!</label> : <></>
                  }
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p style={{fontWeight: 'bold'}}>Vui lòng chọn một sản phẩm trong danh sách...</p>
            </div>
          )}
        </div>
      </div>) : (<div>notfound...</div>)}
      </div>
    );
  }
}