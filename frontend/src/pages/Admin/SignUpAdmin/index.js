import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
    perfis: [],
    perfil: "",
    menssage: null
  };

  componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
      api.query({
        query: gql`{perfis { id rotulo }}`
      }).then(resultado => {
          this.setState({perfis: resultado.data.perfis})
          this.erros = null
      }).catch(e => {
          this.erros = e
      })
  }
  //Cadastrar novo Usuario pela conta admin
  handleSignUp = async e => {
   
    e.preventDefault();
    const { nome, email, senha, perfil } = this.state
    if (!nome || !email || !senha|| !perfil || perfil === 'selecione' ) {
      this.setState({ menssage: "Preencha todos os dados para se cadastrar" })
    } else {
      try {
        const perfis = [{nome: perfil}]//como o frontend por ora so aceita um perfil...
        api.mutate({
          mutation: gql`
            mutation
            (
              $nome: String!
              $email: String!
              $senha: String!
              $perfis: [PerfilFiltro]
            )
            {
              novoUsuario(
                dados:{
                  nome: $nome,
                  email: $email, 
                  senha: $senha,
                  perfis: $perfis
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
          senha,
          perfis,
        }
        }).then(resultado => {
          console.log(resultado.data.novoUsuario)
          this.setState({ menssage: null})
          // this.setState({ nome: null})
          // this.setState({ email: null})
          // this.setState({ senha: null})
          this.setState({ menssage: 'Usuario Cadastrado com sucesso!'})
        }).catch(e =>  {
          console.log(e)
          this.setState({ menssage: 'Email Já Cadastrado!' })}
          )
      } catch (e) {
        console.log(e);
        this.setState({ menssage: "Ocorreu um erro ao registrar o novo usuario. T.T" });
      }
    }
  }

  render() {
    const {perfis} = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo" />
          {this.state.menssage && <p>{this.state.menssage}</p>}
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
          <label className='cbPerfis'>
            <p>Escolha o perfil desse usuario:</p>
            <select onChange={e => this.setState({ perfil: e.target.value })}>
            <option value='selecione'>{'<selecione>'}</option>
              {
                perfis.map( perfil => (
                  <option key={perfil.id} value={perfil.nome}>{perfil.rotulo}</option>
                ))
              } 
            </select>
          </label>
          <button type="submit">Cadastrar Novo Usuario</button>
          <hr /> 
        </Form>
      </Container> 
    );
  }
}

export default withRouter(SignupAdmin);