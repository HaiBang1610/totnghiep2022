import React, { Component } from "react";
import smallshop from "../image/smallshop.jpg"
import smallshop1 from "../image/smallshop1.jpg"
import "./home-unlogin.component.css"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useNavigate } from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        // etc...
      />
    );
  };

class HomeUnlogin extends Component {
    render(){
        return(
            <div>
                <Slide slidesToShow={1} duration={5000}>
                    <div className="each-slide-effect">
                        <div style={{backgroundImage: `url(${smallshop})`}}>
                            <span>
                                <h1 style={{fontWeight: 'bold', color: "white"}}>
                                    Chào mừng đến với 210 Business<br/>
                                    <p class="h6">Quản lý kinh doanh cho tiệm tạp hóa nhỏ</p>
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => this.props.navigate(`/login`)}>Bắt đầu sử dụng</button>
                                </h1>
                            </span>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{backgroundImage: `url(${smallshop1})`}}>
                            <span>
                                <h1 style={{fontWeight: 'bold', color: "white"}}>
                                    210 Business<br/>
                                    <p class="h4">Quản lý nhanh chóng, tiện lợi, phù hợp cho các tiệm tạp hóa nhỏ</p>
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => this.props.navigate(`/login`)}>Bắt đầu sử dụng</button>
                                </h1>
                            </span>
                        </div>
                    </div>
                </Slide>
            </div>
        )
    }
}

export default withRouter(HomeUnlogin);

