import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

//Imports de outros arquivos
import { isAuthenticated, isAdmin } from "./services/auth"
//Imports pages
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Planos from "./pages/UsuariosLogados/Planos"
import AdquirirPlano from "./pages/UsuariosLogados/AdquirirPlano"
import Cart from "./pages/UsuariosLogados/Cart"
import QuestsPlano from "./pages/UsuariosLogados/QuestsPlano"
import RegisterProfile from "./pages/Admin/RegisterProfile"
import SignupAdmin from "./pages/Admin/SignUpAdmin"
import Usuarios from './pages/Admin/Usuarios'
import Perfis from './pages/Admin/Perfis'

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
      <UnloggedRoute path="/signup" component={SignUp} />
      <UnloggedRoute path="/signIn" component={SignIn} />
      <PrivateRoute path="/planos" component={Planos} />
      <PrivateRoute path="/questsPlano/:id" component={QuestsPlano} />
      <PrivateRoute path="/adquirirPlano" component={AdquirirPlano} />
      <PrivateRoute path="/cart" component={Cart} />
      <PrivateRouteAdmin path="/RegisterProfile" component={RegisterProfile} />
      <PrivateRouteAdmin path="/signupAdmin" component={SignupAdmin} />
      <PrivateRouteAdmin path="/usuarios" component={Usuarios} />
      <PrivateRouteAdmin path="/perfis" component={Perfis} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;