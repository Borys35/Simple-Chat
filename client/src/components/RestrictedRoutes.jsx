import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Chat from './Chat';
import Login from './Login';
import Register from './Register';

let authed = null;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return authed ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !authed ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

function RestrictedRoutes() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/users/verifyToken', {
      credentials: 'include'
    }).then(res => {
      authed = res.ok;
      setLoading(false);
    });
  }, [location]);

  return (
    !loading && (
      <Switch>
        <PrivateRoute exact path="/" component={Chat} />
        <PublicOnlyRoute path="/login" component={Login} />
        <PublicOnlyRoute path="/register" component={Register} />
      </Switch>
    )
  );
}

export default RestrictedRoutes;
