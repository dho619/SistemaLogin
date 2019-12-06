import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Imports de outros arquivos
import { isAuthenticated, isAdmin } from "./services/auth";
//Imports pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import App from "./pages/Usuarios/HomeUsuario";
import RegisterProfile from "./pages/Admin/RegisterProfile";
import SignupAdmin from "./pages/Admin/SignUpAdmin";


//Rota para usuarios logados
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />
      )
    }
  />
);

//Rota para usuarios admin
const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

//Rota para usuarios nao logados
const UnloggedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <UnloggedRoute path="/signIn" component={SignIn} />
      <PrivateRoute path="/app" component={App} />
      <PrivateRouteAdmin path="/RegisterProfile" component={RegisterProfile} />
      <PrivateRouteAdmin path="/signupAdmin" component={SignupAdmin} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;