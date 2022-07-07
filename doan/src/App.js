import React, { Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Routes, Route } from "react-router-dom";
import "./App.css"

import AuthService from "./services/auth.service";

import ProductsList from "./product-components/product-list.component"
import AddProduct from "./product-components/add-product.component"
import Product from "./product-components/product.component"
import NotFound from "./product-components/notfound"

import SuppliersList from "./supplier-components/supplier-list.component"
import AddSupplier from "./supplier-components/add-supplier.component";
import Supplier from "./supplier-components/supplier.component"

import ManagementsList from "./management-components/management-list.component"
import AddManagement from "./management-components/add-management.component";

import Login from "./login-components/login.component";
import Register from "./login-components/register.component";
import Home from "./login-components/home.component";
import HomeUnlogin from "./login-components/home-unlogin.component";
import Profile from "./login-components/profile.component";
import BoardUser from "./login-components/board-user.component";
import BoardModerator from "./login-components/board-moderator.component";
import BoardAdmin from "./login-components/board-admin.component";
import UserUpdate from "./login-components/user-update.component"
import UserPassUpdate from "./login-components/user-updatePass.component"

import ProductsListT from "./tutorial-components/product-list.tutorial";
import AddProductT from "./tutorial-components/add-product.tutorial"
import UpdateProductT from "./tutorial-components/update-product.tutorial"
import SuppliersListT from "./tutorial-components/supplier-list.tutorial"
import AddSupplierT from "./tutorial-components/add-supplier.tutorial"
import UpdateSupplierT from "./tutorial-components/update-supplier.tutorial"
import ManagementsListT from "./tutorial-components/management-list.tutorial";
import AddManagementT from "./tutorial-components/add-management.tutorial"

import EventBus from "./common/EventBus";
import AuthVerify from "./common/auth-verify";

import background from "./image/background1.jpg"
//import { Parallax } from "react-parallax";

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      height: '180vh'
    };

    //this.appMenuRef = React.createRef();
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      console.log(user.roles)
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
    
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {

    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div style ={{backgroundImage:`url(${background})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: this.state.height}
                  }>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {currentUser
          ? (<Link to={"/home"} className="navbar-brand">
              210 Business
            </Link>)
          : (<Link to={"/homeUnlogin"} className="navbar-brand">
              210 Business
            </Link>) 
          }
                   
          <div className="navbar-nav me-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
            <React.Fragment>
              <li className="nav-item ">
                <Link to={"/products"} className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/suppliers"} className="nav-link">
                  Suppliers
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/managements"} className="nav-link">
                  Managements
                </Link>
              </li>
            </React.Fragment>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              {/*<li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
                </li>*/}
            </div>
          )}
        </nav>

        <div className="container mt-3" >
          <Routes>
            {/*Product*/}
            <Route exact path="/products" element={<ProductsList/>} />
            <Route exact path="/add" element={<AddProduct/>} />
            <Route path="/products/:id" element={<Product/>} />
            <Route path="*" element={<NotFound/>} />
            {/*Supplier*/}
            <Route exact path="/suppliers" element={<SuppliersList/>} />
            <Route exact path="/addSupplier" element={<AddSupplier/>} />
            <Route path="/suppliers/:id" element={<Supplier/>} />
            {/*Management*/}
            <Route exact path="/managements" element={<ManagementsList/>} />
            <Route exact path="/addManagement" element={<AddManagement/>} />
            {/*Login*/}
            <Route exact path="/"  element={<Home/>} />
            <Route exact path="/home"  element={<Home/>} />
            <Route exact path="/homeUnlogin"  element={<HomeUnlogin/>} />
            <Route exact path="/login"  element={<Login/>} />
            <Route exact path="/register"  element={<Register/>} />
            <Route exact path="/profile"  element={<Profile/>} />
            <Route path="/user"  element={<BoardUser/>} />
            <Route path="/mod"  element={<BoardModerator/>} />
            <Route path="/admin"  element={<BoardAdmin/>} />
            <Route path="/usersPacket/:id" element={<UserUpdate/>} />
            <Route path="/usersPacketPass/:id" element={<UserPassUpdate/>} />
            {/*Tutorial*/}
            <Route exact path="/productsT" element={<ProductsListT/>} />
            <Route exact path="/addProductT" element={<AddProductT/>} />
            <Route exact path="/updateProductT" element={<UpdateProductT/>} />
            <Route exact path="/suppliersT" element={<SuppliersListT/>} />
            <Route exact path="/addSupplierT" element={<AddSupplierT/>} />
            <Route exact path="/updateSupplierT" element={<UpdateSupplierT/>} />
            <Route exact path="/managementsT" element={<ManagementsListT/>} />
            <Route exact path="/addManagementT" element={<AddManagementT/>} />
          </Routes>
        </div>
        <footer>
          <p>by PQHB</p>
        </footer>
        <AuthVerify logOut={this.logOut}/>
      </div >
    );
  }
}
export default App;