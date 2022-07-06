import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import updateProductLink from "../image/updateProductLink.PNG"
import updateProduct from "../image/updateProduct.PNG"

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

class UpdateProductT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Cập nhật thông tin sản phẩm'</h3>
                <img src={updateProductLink} alt="display" width="250" height="250" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Từ mục chi tiết sản phẩm tại trang danh sách sản phẩm, nhấn vào 'Cập nhật thông tin' để chuyển sang trang cập nhật thông tin sản phẩm.
                </p>
                <img src={updateProduct} alt="display" width="500" height="600" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện chính của trang cập nhật thông tin sản phẩm.<br/>
                    - Tương tự như trang thêm sản phẩm mới, thông tin chi tiết, số lượng và giá sản phẩm là những thông tin bắt buộc không được bỏ trống.<br/>
                    - Giá sản phẩm sau khi cập nhật có giá trị tối thiểu là 1000 VND.<br/>
                    - Nút số 1 (Còn hàng/Hết hàng): được sử dụng để thay đổi tình trạng hiện tại của sản phẩm.<br/>
                    - Nút số 2 (Xóa): được sử dụng nếu muốn xóa sản phẩm này khỏi danh sách.<br/>
                    - Nút số 3 (Cập nhật): được sử dụng để xác nhận cập nhật sản phẩm sau khi đã đầy đủ các thông tin cần thiết.<br/>
                    - Nút số 4 (Trở lạ): được sử dụng để trở lại trang danh sách sản phẩm.
                </p>
                
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(UpdateProductT)