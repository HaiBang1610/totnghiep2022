import React, { Component } from "react";
import { Link} from "react-router-dom";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
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

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
          <header className="jumbotron">
            <h3>Hướng dẫn sử dụng website quản lý kinh doanh cho tiệm tạp hóa nhỏ 210 Busines</h3>
          </header>
        <h4>
          <li>
            Quản lý sản phẩm (Products){" "}
          </li>
        </h4>
          <div>
                <p style={{fontWeight: 'bold'}}>
                  1. Danh sách sản phẩm{" "}
                  <Link to={`/productsT`}>
                    Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold'}}>
                  2. Thêm sản phẩm mới{" "}
                  <Link to={`/addProductT`}>
                    Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold'}}>
                  3. Cập nhật thông tin sản phẩm{" "}
                  <Link to={`/updateProductT`}>
                    Xem
                  </Link>
                </p>
          </div>
        <h4>
          <li>
            Quản lý nhà cung cấp (Suppliers){" "}
          </li>
        </h4>
          <div>
                <p style={{fontWeight: 'bold'}}>
                  1. Danh sách nhà cung cấp{" "}
                  <Link to={`/suppliersT`}>
                    Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold'}}>
                  2. Thêm nhà cung cấp mới{" "}
                  <Link to={`/addSupplierT`}>
                    Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold'}}>
                  3. Cập nhật thông tin nhà cung cấp{" "}
                  <Link to={`/updateSupplierT`}>
                    Xem
                  </Link>
                </p>
          </div>
        <h4>
          <li>
            Quản lý đơn hàng (Managements){" "}
          </li>
        </h4>
          <div>
                <p style={{fontWeight: 'bold'}}>
                  1. Danh sách đơn hàng{" "}
                  <Link to={`/managementsT`}>
                    Xem
                  </Link>
                </p>
                <p style={{fontWeight: 'bold'}}>
                  2. Thêm nhà đơn hàng mới{" "}
                  <Link to={`/addManagementT`}>
                    Xem
                  </Link>
                </p>
          </div>
      </div>
    );
  }
}
