import React, { Component } from "react";
import { Link} from "react-router-dom";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
    };
  }

  onChangeProductShowTrue(){
    this.setState({
      product_show: true
    })
  }

  onChangeProductShowFalse(){
    this.setState({
      product_show: false
    })
  }

  componentDidMount() {
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

  render() {
    const {currentUser} =this.state
    return (
      <div>
      {currentUser ?
      (<div className="card">
          <header className="jumbotron text-center">
            <h3 style={{color: "black"}}>Hướng dẫn sử dụng trang web quản lý kinh doanh cho tiệm tạp hóa nhỏ 210 Busines</h3>
          </header>
          <h4 style={{color: "red"}}>
          <li>
            Quản lý nhà cung cấp (Suppliers){" "}
          </li>
        </h4>
          <div>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  1. Danh sách nhà cung cấp{" "}
                  <Link to={`/suppliersT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  2. Thêm nhà cung cấp mới{" "}
                  <Link to={`/addSupplierT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  3. Cập nhật thông tin nhà cung cấp{" "}
                  <Link to={`/updateSupplierT`}>
                  Xem
                  </Link>
                </p>
          </div>
        <h4 style={{color: "red"}}>
          <li>
            Quản lý sản phẩm (Products){" "}
          </li>
        </h4>
          <div>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  1. Danh sách sản phẩm{" "}
                  <Link to={`/productsT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  2. Thêm sản phẩm mới{" "}
                  <Link to={`/addProductT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  3. Cập nhật thông tin sản phẩm{" "}
                  <Link to={`/updateProductT`}>
                  Xem
                  </Link>
                </p>
          </div>
        <h4 style={{color: "red"}}>
          <li>
            Quản lý đơn hàng (Managements){" "}
          </li>
        </h4>
          <div>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  1. Danh sách đơn hàng{" "}
                  <Link to={`/managementsT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  2. Thêm nhà đơn hàng mới{" "}
                  <Link to={`/addManagementT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "30px"}}>
                  3. In hóa đơn{" "}
                  <Link to={`/addReceiptT`}>
                  Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold', textIndent: "47px"}}>
                  Hóa đơn{" "}
                  <Link to={`/ReceiptT`}>
                  Xem
                  </Link>
                </p>
          </div>
      </div>) : (<div>notfound...</div>)}
      </div>
    );
  }
}
