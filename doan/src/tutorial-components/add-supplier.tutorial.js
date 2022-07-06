import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import addSupplier from "../image/addSupplier.PNG"
import addSupplierButton from "../image/addSupplierButton.PNG"
import supplierNameAvai from "../image/supplierNameAvai.PNG"
import addSupplieComplete from"../image/addSupplierComplete.PNG"

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

class AddSupplierT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Thêm nhà cung cấp mới'</h3>
                <img src={addSupplierButton} alt="display" width="190" height="40" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Từ trang danh sách nhà cung cấp, nhấn vào nút 'Thêm nhà cung cấp' để chuyển sang trang thêm nhà cung cấp mới.
                </p>
                <img src={addSupplier} alt="display" width="500" height="450" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện chính của trang.<br/>
                    - Tất cả các thông tin đều là bắt buộc trước khi chính thức thêm nhà cung cấp.
                </p>
                <img src={supplierNameAvai} alt="display" width="500" height="80" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Tên nhà cung cấp không được trùng với tên của những nhà cung cấp đã tồn tại trong danh sách.
                </p>
                <img src={addSupplieComplete} alt="display" width="400" height="100" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện khi thêm nhà cung cấp thành công.
                </p>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(AddSupplierT)