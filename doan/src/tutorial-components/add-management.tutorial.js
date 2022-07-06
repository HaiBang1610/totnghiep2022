import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import addManagementButton from "../image/addManagementButton.PNG"
import addManagement from "../image/addManagement.PNG"
import addManagementComplete from "../image/addManagementComplete.PNG"

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

class AddManagementT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Thêm nhà đơn hàng mới'</h3>
                <img src={addManagementButton} alt="display" width="150" height="50" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Từ trang danh sách đơn hàng, nhấn vào nút 'Thêm đơn hàng' để chuyển sang trang thêm đơn hàng mới.
                </p>
                <img src={addManagement} alt="display" width="500" height="450" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện chính của trang.<br/>
                    - Tất cả các thông tin đều là bắt buộc trước khi chính thức thêm đơn hàng.
                </p>
                <img src={addManagementComplete} alt="display" width="350" height="100" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện khi thêm đơn hàng thành công.
                </p>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(AddManagementT)