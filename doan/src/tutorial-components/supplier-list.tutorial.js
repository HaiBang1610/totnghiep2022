import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import supplierList from "../image/supplierList.PNG"

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

class SuppliersListT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Danh sách nhà cung cấp'</h3>
                <img src={supplierList  } alt="display" width="550" height="400" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện chính của trang 'Danh sách nhà cung cấp'.<br/>
                    - Có thanh tìm kiếm theo tên nhà cung cấp và nút làm mới danh sách.<br/>
                    - Sử dụng nút 'Thêm nhà cung cấp' để chuyển sang trang thêm nhà cung cấp mới.<br/>
                    - Sử dụng 'Cập nhật thông tin' tại chi tiết nhà cung cấp để cập nhật lại thông tin.
                </p>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(SuppliersListT)