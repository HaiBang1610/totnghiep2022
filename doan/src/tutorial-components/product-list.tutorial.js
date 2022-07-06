import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import productSearchFill from "../image/ProductSearchFill.PNG"
import productRefresh from "../image/ProductRefresh.PNG"
import productList from "../image/ProductList.PNG"

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        //params={useParams()} //useParams
        navigate={navigate}
        // etc...
      />
    );
  };

class ProductsListT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Danh sách sản phẩm'</h3>
                <img src={productSearchFill} alt="display" width="500" height="100" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Tìm kiếm theo tên sản phẩm: Nhập tên sản phẩm và nhấn nút tìm kiếm để thực hiện.<br/>
                    - Lọc theo loại sản phẩm: Chọn 1 trong 4 loại sản phẩm và nhấn nút lọc để thực hiện.
                </p>
                <img src={productRefresh} alt="display" width="250" height="50" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Nút 1: Nhận biết tình trạng hiện tại của sản phẩm qua màu sắc.<br/>
                    - Nút 2: Làm mới danh sách sản phẩm <br/>
                    - Nút 3: Lọc các sản phẩm có tình trạng hết hàng.
                </p>
                <img src={productList} alt="display" width="500" height="450" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Nhấn vào 1 sản phẩm để xem thông tin chi tiết. Nhấn vào 'Cập nhật thông tin' để chuyển sang trang cập nhật.<br/>
                    - Nhấn vào nút 'Thêm sản phẩm' để chuyển sang trang thêm sản phẩm mới.<br/>
                    - Nhấn vào nút 'Xóa tất cả' để xác nhận xóa tất cả sản phẩm trong danh sách.
                </p>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(ProductsListT)