import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import updateSupplier from "../image/updateSupplier.PNG"
import updateSupplierLink from "../image/updateSupplierLink.PNG"

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

  class UpdateSupplierT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Cập nhật thông tin nhà cung cấp'</h3>
                <img src={updateSupplierLink} alt="display" width="300" height="250" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Từ mục chi tiết nhà cung cấp tại trang danh sách nhà cung cấp, nhấn vào 'Cập nhật thông tin' để chuyển sang trang cập nhật thông tin nhà cung cấp.
                </p>
                <img src={updateSupplier} alt="display" width="500" height="450" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện chính của trang cập nhật thông tin nhà cung cấp.<br/>
                    - Tương tự như trang thêm nhà cung cấp mới, toàn bộ thông tin bắt buộc không được bỏ trống.<br/>
                    - Nút số 1 (Xóa): được sử dụng nếu muốn xóa nhà cung cấp này khỏi danh sách.<br/>
                    - Nút số 2 (Cập nhật): được sử dụng để xác nhận cập nhật nhà cung cấp sau khi đã đầy đủ các thông tin cần thiết.<br/>
                    - Nút số 3 (Trở lạ): được sử dụng để trở lại trang danh sách nhà cung cấp.
                </p>
                
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(UpdateSupplierT)