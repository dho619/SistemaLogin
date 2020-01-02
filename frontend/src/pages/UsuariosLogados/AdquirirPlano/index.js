import React, { Component } from "react"
import gql from "graphql-tag"
import { Link } from 'react-router-dom'

import api from '../../../services/api'
import Div from './styles'
import iconComprar from '../../../assets/IconComprar.png'

const tokenCart = '@Gurren-cart'

export default class AdquirirQuest extends Component {
  state = { //state e um objeto
    Questionarios: [],
    QuestsPlano: [],
    exibirPerg : new Map(),
    exibirOpcPerg : new Map(),
  }

  //componentDidMount executa assim que e criado a pagina
  async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
      this.loadQuest();
      let QuestsPlano = JSON.parse(localStorage.getItem(tokenCart))
      if(!QuestsPlano) QuestsPlano = [] //caso nao tenha nada no QuestsPlano
      this.setState({QuestsPlano})
  }

  loadQuest = async () => {
      await api.query({
          query: gql`
              query{
                listarQuestionarios { id, nome, perguntas { id descricao opcoes { id descricao }}}
              }
          `,
      }).then(response => {
          this.setState({ Questionarios: response.data.listarQuestionarios });
      }).catch(e => {
          console.log(e)
      })       
  };

  exibirPerguntas = (id) => {
    let { exibirPerg } = this.state
    try {
        let exibir = exibirPerg.get(id)
        if(exibir){
            exibirPerg.set(id, false)
        } else {
            exibirPerg.set(id, true)  
        }
    } catch (error) {
        exibirPerg.set(id, true)            
    }
    this.setState({exibirPerg})
  }

  exibirOpcPerg = (id) => {
      let { exibirOpcPerg } = this.state
      try {
          let exibir = exibirOpcPerg.get(id)
          if(exibir){
              exibirOpcPerg.set(id, false)
          } else {
              exibirOpcPerg.set(id, true)  
          }
      } catch (error) {
          exibirOpcPerg.set(id, true)            
      }
      this.setState({exibirOpcPerg})
  }

  adicionarNaLista = (quest) => {
    let QuestsPlano = JSON.parse(localStorage.getItem(tokenCart))
    if(!QuestsPlano) QuestsPlano = [] //caso nao tenha nada no QuestsPlano
    let index = QuestsPlano.findIndex(q => q.id === quest.id)
    if(index < 0){
      QuestsPlano.push(quest)
      localStorage.setItem(tokenCart, JSON.stringify(QuestsPlano))
      this.setState({QuestsPlano}) //para reconstruir a pagina
    }
  }
  adicionarTodosNaLista = () => {
    const { Questionarios } = this.state
    let QuestsPlano = []
    for(let quest of Questionarios){
      QuestsPlano.push({id: quest.id, nome: quest.nome})
    }
    localStorage.setItem(tokenCart, JSON.stringify(QuestsPlano))
    this.setState({QuestsPlano})
  }
  removerDaLista = (id) => {
    let QuestsPlano = JSON.parse(localStorage.getItem(tokenCart))
    const indice = QuestsPlano.findIndex(q => q.id === id)
    if (indice > -1){
      QuestsPlano.splice(indice, 1)
      localStorage.setItem(tokenCart, JSON.stringify(QuestsPlano))
      this.setState({QuestsPlano})      
    }
  }
  removerTodosdaLista = () => {
    localStorage.removeItem(tokenCart)
    this.setState({QuestsPlano: []})
  }

  render() {
    const { Questionarios, QuestsPlano } = this.state;
    return (
        <Div>
            <div className='esquerda'>
              <header>
                <h3>Questionarios disponíveis:</h3>
              </header>
              <div className='body'>
                {
                  Questionarios.map( quest => (
                    <article className= 'questionarios' key={quest.id}>
                        <p>{quest.nome}</p>
                        <div className='BotoesQuest'>
                          <button onClick={() => {this.exibirPerguntas(quest.id)}}>Perguntas</button>
                          <button onClick={() => {this.adicionarNaLista({id: quest.id, nome: quest.nome})}}>Adicionar a Lista</button>
                        </div>
                        <ul>
                          { this.state.exibirPerg.get(quest.id) &&
                            quest.perguntas.map(pergunta => (
                              <article className= 'perguntas' key={pergunta.id}>                            
                                <p>{pergunta.descricao}</p>
                                <button onClick={() => {this.exibirOpcPerg(pergunta.id)}}>Opcões</button>
                                <ul>
                                {   this.state.exibirOpcPerg.get(pergunta.id) &&
                                    pergunta.opcoes.map(opcao => (
                                    <article className='opcoes' key={opcao.id}>
                                        <li>{opcao.descricao}</li>
                                    </article> 
                                    ))
                                }
                                </ul>
                              </article>
                            ))
                          }
                        </ul>
                    </article>
                  ))
                }
              </div>
              <button className='btRight' onClick={() => {this.adicionarTodosNaLista()}}>Adicionar Todos Questionarios</button>
            </div>
            <div className='direita'>
              <header>
                <h3>Questionarios do novo Plano:</h3>
              </header>
              <div className='body'>
                {
                  QuestsPlano.map(quest => (
                    <article className= 'questionarios' key={quest.id}>
                        <strong>{quest.nome}</strong>
                        <button onClick={() => {this.removerDaLista(quest.id)}} className='btRight'>Remover</button>
                        <br/>
                    </article>
                  ))
                }
              </div>
              <div className='footer'>
                <button onClick={() => {this.removerTodosdaLista()}}>Limpar</button>
                <Link to={`/cart`} title='Adquirir Questionários'>
                    <img className='icon' alt='Imagem Adquirir Questionários' src={iconComprar}/>
                </Link>
              </div>
            </div>
        </Div>
    )
  }
}