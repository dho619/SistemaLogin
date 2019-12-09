import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import gql from "graphql-tag"

//Imports de outros arquivos
import api from "../../../services/api";
import Logo from "../../../assets/Logo.png";
import { Form, Container } from "./styles";

class SignupAdmin extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    error: ""
  };
  //Cadastrar novo Usuario comum
  handleSignUp = async e => {
    e.preventDefault();
    const { nome, email, senha } = this.state;
    if (!nome || !email || !senha) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        api.mutate({
          mutation: gql`
            mutation
            (
              $nome: String!
              $email: String!
              $senha: String!
            )
            {
              registrarUsuario(
                dados:{
                  nome: $nome,
                  email: $email, 
                  senha: $senha
                }
              )
            {
              id nome email  
              ativo created_at updated_at
              perfis { rotulo }
            }
            }
        `,
        variables: {
          nome,
          email,
          senha
        }
        }).then(resultado => {
          console.log(resultado.data.registrarUsuario)
          this.setState({ error: null})
          // this.setState({ nome: null})
          // this.setState({ email: null})
          // this.setState({ senha: null})
          this.props.history.push("/");
        }).catch(e =>  {
          console.log(e)
          this.setState({ error: 'Email Já Cadastrado!' });}
          )
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome Completo"
            onChange={e => this.setState({ nome: e.target.value })}
          />
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
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container> 
    );
  }
}

export default withRouter(SignupAdmin);