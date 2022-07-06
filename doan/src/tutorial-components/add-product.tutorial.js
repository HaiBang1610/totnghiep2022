import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import addButton from "../image/addButton.PNG"
import addForm from "../image/addForm.PNG"
import productNameAvai from "../image/productNameAvai.PNG"
import addProductComplete from "../image/addProductComplete.PNG"
import productPriceMin from "../image/productPriceMin.PNG"

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

class AddProductT extends Component {
    render() {
        return(
            <div>
                <h3>Hướng dẫn sử dụng trang 'Thêm sản phẩm mới'</h3>
                <img src={addButton} alt="display" width="190" height="50" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Từ trang danh sách sản phẩm, nhấn vào nút 'Thêm sản phẩm' để chuyển sang trang thêm sản phẩm mới.
                </p>
                <img src={addForm} alt="display" width="500" height="600" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Tất cả các thông tin (trừ đường dẫn ảnh) đều là bắt buộc trước khi chính thức thêm sản phẩm.
                </p>
                <img src={productNameAvai} alt="display" width="500" height="100" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Tên sản phẩm không được trùng với tên của những sản phẩm đã tồn tại trong danh sách.
                </p>
                <img src={productPriceMin} alt="display" width="500" height="90" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giá tối thiểu của sản phẩm là 1000 VND.
                </p>
                <img src={addProductComplete} alt="display" width="300" height="100" /><br/>
                <p style={{fontWeight: 'bold'}}>
                    - Giao diện khi thêm sản phẩm thành công.
                </p>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>
            
        )
    }
}

export default withRouter(AddProductT)