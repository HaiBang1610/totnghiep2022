import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params} //useParams
      navigate={navigate}
      location={location}
      // etc...
    />
  );
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component {
  constructor(props) {
    super(props);

    this.props.navigate(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const decodedJwt = parseJwt(user.accessToken);

        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(AuthVerify);
