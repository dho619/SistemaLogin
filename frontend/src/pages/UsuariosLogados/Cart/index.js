import React, { Component } from "react"
// import gql from "graphql-tag"
// import { Link } from 'react-router-dom'

// import api from '../../../services/api'
import Div from './styles'
import iconComprar from '../../../assets/IconComprar.png'

const tokenCart = '@Gurren-cart'

export default class Cart extends Component {
  state = {
    QuestsPlano: [],
  }

  async componentDidMount() {
    let QuestsPlano = JSON.parse(localStorage.getItem(tokenCart))
    if(!QuestsPlano) QuestsPlano = [] //caso nao tenha nada no QuestsPlano
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

  render() {
    const { QuestsPlano } = this.state
    return (
        <Div>
            <div className='estrutura'>
              <div className='header'>
                <img className='icon' src={iconComprar}/>
                <strong>Adquirir Novo Plano:</strong>
              </div>{/*className='header'*/}

              <div className='listaQuest'>
                <strong>Lista de Questionários: </strong>
                <div className='itens'>
                  {
                    QuestsPlano.map(quest => (
                      <article className='questionarios'>
                        <strong>{quest.nome}</strong>
                          <button onClick={() => {this.removerDaLista(quest.id)}} className='btRight'>-</button>
                          <br/>
                      </article>
                    ))
                  }
                </div>
              </div>{/*className='listaQuest'*/}


            </div>{/*className='estrutura'*/}
        </Div>
    )
  }
}