import React, { Component } from 'react';

//Imports de outros arquivos
import Form from './styles'
import { isAuthenticated, isAdmin} from '../../services/auth';

class Sidebar extends Component {
  state = {
    admin: false, 
    logado: false,
  }
  //componentDidMount executa assim que e criado a pagina
  componentDidMount() { 
    this.setState({admin: isAdmin()})
    this.setState({logado: isAuthenticated()})
  }

  render() {
    return (
      <Form>
        <a class="$active" href="/">Home</a>
        {this.state.logado && <a href="/app">APP</a>}
        {!this.state.logado && <a href="/signIn">Login</a>}
        {!this.state.logado && <a href="/signUp">Novo Registro</a>}
        {this.state.admin &&<a href="/signupAdmin">Novo Registro</a>}
        {this.state.admin &&<a href="/RegisterProfile">Novo Perfil</a>}
        <a href="#implementar">Usuarios</a>
        <a href="#implementar">Perfis</a>
      </Form>
    )
  }
}

export default Sidebar;