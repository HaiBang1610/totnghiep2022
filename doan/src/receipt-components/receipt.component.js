import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import moment from "moment-timezone";

import UserService from "../services/user.service";
import Scrollbars from "react-custom-scrollbars-2";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    const location = useLocation();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        location={location}
        // etc...
      />
    );
};

class Receipt extends Component{
    constructor(props){
        super(props);
        this.state={
            state1: {},
            currentUser: false,
        }
    }

    componentDidMount() {
        let {state} = this.props.location;
        console.log(state)
        this.setState({
            state1: state,
        })
        UserService.getUserBoard().then(
          response => {
            this.setState({
              currentUser: true,
            });
            console.log(response.data)
          },
          error => {}
        );
    }
    
    render(){
        const {currentUser} =this.state
        let sum= this.state.state1.sale_managements_choose?.reduce((a,b)=>a+ parseInt(b.total_price),0)
        return(
            <div>
                {currentUser ?
                (<div><div class="card">
                  <Scrollbars autoHeightMax={580} autoHeight>
                    <div class="card-body mx-4" ref={el => (this.componentRef = el)}>
                        <div class="container">
                        <p class="my-5 mx-5 text-center" style={{fontSize: "30px"}}>Hóa đơn</p>
                            <div class="row">
                                <ul ul class="list-unstyled">
                                    <li class="text-black">Khách hàng: {this.state.state1.customer_name}</li>
                                    <li class="text-black mt-1">Thời gian: {this.state.state1.createTime}</li>
                                </ul>
                                <hr style={{border: "2px solid black"}}/>                          
                            {this.state.state1.sale_managements_choose?.map((item)=>(<div><div class="col-xl-10"><p>{item.product_name} x {item.sell_amount}</p></div><div class="col-xl-12"><p class="float-end">{item.total_price} VND</p></div></div>))}<br/>
                            <hr style={{border: "2px solid black"}}/>
                            </div>
                            <div class="row text-black">
                                <div class="col-xl-12">
                                    <p class="float-end fw-bold">Tổng tiền: {sum} VND
                                    </p>
                                </div>
                            <hr style={{border: "2px solid black"}}/>
                            <br/><br/>
                            <div className="text-center text-muted">
                              Cảm ơn bạn đã mua sắm tại {this.state.state1.shop_name}
                            </div>
                            </div>
                        </div>
                    </div></Scrollbars>
                </div>
                <ReactToPrint content={() => this.componentRef} pageStyle="@page { size: 4in 5in } @media print {div{height: 100%;}}">
                  <PrintContextConsumer PrintContextConsumer>
                    {({ handlePrint }) => (
                      <div className="text-center"><button className="btn btn-primary" onClick={handlePrint}><i class="bi bi-printer"></i>{" "}In</button>
                                                  <text>{" "}</text><button className="btn btn-danger" onClick={() => this.props.navigate(`/addReceipt`)}>Trở lại</button></div>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
                </div>)
                : (<div>notfound...</div>)
            }
            </div>
        )
    }
}

export default withRouter(Receipt)