import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

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

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    //if (!currentUser) this.setState({ redirect: '/home' });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    //if (this.state.redirect) {
    //  this.props.navigate(this.state.redirect)
    //}

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>Thông tin người dùng</strong>
          </h3>
        </header>
        <p>
          <strong>Tên tài khoản:</strong>{" "}
          {currentUser.username}
        </p>
        {/*<p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>*/}
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Quyền truy cập:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}

export default withRouter(Profile);
