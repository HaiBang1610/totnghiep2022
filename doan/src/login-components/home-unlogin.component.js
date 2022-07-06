import React, { Component } from "react";
import smallshop from "../image/smallshop.jpg"
import "./home-unlogin.component.css"

export default class HomeUnlogin extends Component {
    render(){
        return(
            <div>
                <img src={smallshop} alt="Snow" width="100%" height="600"/>
                <h1 class="centered" style={{fontWeight: 'bold'}}>
                    Chào mừng đến với 210 Business<br/>
                    <p class="h6 centered2">Quản lý kinh doanh cho tiệm tạp hóa nhỏ</p>
                </h1>
                <div class="row">
                <p class='h2'>Một vài tin tức nhỏ:</p>
                    <div class="col-sm">
                        <h4 style={{fontWeight: 'bold'}}>Đôi nét về mè xửng đặc sản Huế</h4>
                        <p class="h6">Kẹo mè xửng Huế  là loại kẹo ngọt dẻo, được làm từ mạch nha pha trộn lẫn với dầu phụng 
                            (dầu từ đậu phụng), có mè bao phủ xung quanh kẹo, được cắt từng miếng vuông nhỏ (bao giấy bóng nhỏ) 
                            gói trong hộp. Kẹo mè xửng là một trong những đặc sản đã trở thành biểu tượng văn hóa của Huế<br/>
                            Các loại kẹo mè xửng: mè xửng dẻo, mè xửng giòn, mè xửng gương.<br/>
                            <a href="https://amthuchue.info/doi-net-ve-keo-me-xung-dac-san-hue/" target="_blank" rel="noreferrer">Chi tiết</a>
                        </p>
                    </div>
                    <div class="col-sm">
                        <h4 style={{fontWeight: 'bold'}}>Trúng thưởng 100 triệu khi uống nước giải khát của Tân Hiệp Phát</h4>
                        <p class="h6">Từ ngày 18/4/2022 đến ngày 16/7/2022, tập đoàn Tân Hiệp Phát tổ chức sự kiện lớn 'Xé ngay trúng liền'.
                            Bạn có thể tham gia bằng cách xé các nhãn chai Trà xanh không độ, Trà thanh nhiệt Dr Thanh và Nước tăng lực
                            Number 1, sau đó nhập mã dự thưởng thì bạn sẽ có cơ hộ trúng các thẻ cào điện thoại. Đặc biệt có 9 giải triệu phú
                            trị giá 100 triệu mỗi giải và 1 giải tỉ phú trị giá 1 tỷ.
                        <br/>
                            <a href="https://xengaytrunglien.com" target="_blank" rel="noreferrer">Chi tiết</a>
                        </p>
                    </div>
                    <div div class="col-sm">
                        <h4 style={{fontWeight: 'bold'}}>Đón hè sang cùng chương trình khuyến mại lớn của Bia Hà Nội</h4>
                        <p class="h6">
                        Từ ngày 20/4/2022 đến 30/7/2022, khách hàng tại tất cả các tỉnh, thành phố từ Quảng Trị trở ra phía Bắc khi mua thùng Bia Hà 
                        Nội vàng và Bia Hà Nội xanh đều có cơ hội nhận thưởng từ chương trình khuyến mại này. Cơ cấu giải thưởng của chương trình lớn 
                        gồm 08 giải Nhất mỗi giải 01 cây vàng SJC 9999; 80 giải Nhì mỗi giải 01 chỉ vàng SJC 9999 và hàng trăm nghìn giải thưởng là 
                        mã tiền điện thoại trị giá 20.000 VNĐ<br/>
                            <a href="https://www.vba.com.vn/index.php?option=com_content&view=article&id=35372:2022-06-21-08-19-18&catid=59:dien-dan&Itemid=189" target="_blank" rel="noreferrer">Chi tiết</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

