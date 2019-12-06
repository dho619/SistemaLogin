import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import gql from "graphql-tag"

//Imports de outros arquivos
import Logo from "../../assets/Astek_Logo.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    senha: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, senha } = this.state;
    if (!email || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        api.query({
            query: gql `
                query (
                    $email: String!
                    $senha: String!
                ){
                    login(
                        dados: {
                            email: $email
                            senha: $senha
                        }
                    ){
                        id nome email token perfis { nome rotulo }
                    }
                }
            `,
            variables: {
                email: email,
                senha: senha
            }
        }).then(resultado => {
            login(resultado.data.login);
            this.setState({ error: null})
            window.location.href= "/app";
        }).catch(e => {
            this.erros = e
        })
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);