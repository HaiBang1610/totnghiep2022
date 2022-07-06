import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import managementList from "../image/managementList.PNG"

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

class ManagementsListT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Danh sách đơn hàng'</h3>
                <img src={managementList} alt="display" width="550" height="400" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện chính của trang 'Danh sách đơn hàng'.<br/>
                    - Có thanh tìm kiếm theo tên sản phẩm, nút làm mới danh sách và nút lọc theo ngày bán.<br/>
                    - Sử dụng nút 'Thêm đơn hàng' để chuyển sang trang thêm đơn hàng mới.<br/>
                </p>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(ManagementsListT)