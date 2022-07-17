import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";

import addSupplier from "../image/add_supplier.png"

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
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
    };
  }
  componentDidMount() {
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
    render() {
      const {currentUser} =this.state
        return(
          <div>
            {currentUser ?
            (<div>
                <h3>Hướng dẫn sử dụng trang 'Thêm nhà cung cấp mới'</h3>
                <img src={addSupplier} alt="display" width="880" height="500" /><br/>
                <button onClick={() => this.props.navigate(`/home`)} className="badge bg-dark mr-2">
                    Trở lại
                </button>
            </div>) : (<div>notfound...</div>)}
          </div> 
        )
    }
}

export default withRouter(AddSupplierT)