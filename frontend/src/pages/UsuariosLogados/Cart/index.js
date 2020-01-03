import React, { Component } from "react"
// import gql from "graphql-tag"
// import { Link } from 'react-router-dom'

// import api from '../../../services/api'
import Div from './styles'
import iconComprar from '../../../assets/IconComprar.png'
import { pagar, limparPagar, vezPagamento } from '../../../services/auth'
const tokenCart = '@Gurren-cart'

export default class Cart extends Component {
  state = {
    QuestsPlano: [],
    usaValidade: false,
    qtd: 1,
    dias: [15,30,60,90,120,180,240,360,720],
    dia: 15,
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

  removerTodosdaLista = () => {
    localStorage.removeItem(tokenCart)
    this.setState({QuestsPlano: []})
  }

  fecharVenda = async () => {
    if(vezPagamento() === 'true'){
      alert('Compra executada com Sucesso!')
      limparPagar()
      document.getElementById("pagar").checked = false
      this.removerTodosdaLista()
    } else{
      alert('Efetue o pagamento, antes de continuar!')
    }
  }

  render() {
    const { QuestsPlano, dias, usaValidade } = this.state
    return (
        <Div>
            <div className='estrutura'>
              <div className='header'>
                <img className='icon' alt='Imagem de carrinho de compras' src={iconComprar}/>
                <strong>Adquirir Novo Plano:</strong>
              </div>{/*className='header'*/}

              <div className='listaQuest'>
                <strong>Lista de Questionários: </strong>
                <div className='itens'>
                  {
                    QuestsPlano.map(quest => (
                      <article key={quest.id} className='questionarios'>
                        <strong>{quest.nome}</strong>
                          <button onClick={() => {this.removerDaLista(quest.id)}} className='btRight'>-</button>
                          <br/>
                      </article>
                    ))
                  }
                </div>
              </div>{/*className='listaQuest'*/}
              <div className='informacoes'>
                <strong>Comprar por Dias:</strong>&nbsp;&nbsp;
                <input type="checkbox" id="usaValidade" onClick={e => this.setState({ usaValidade: !usaValidade })}/>
                <br/><br/>
                <strong>Quantidade por unidade:</strong>&nbsp;&nbsp;
                <input
                  type="number"
                  placeholder="Quantidade de unidades"
                  onChange={e => this.setState({ qtd: e.target.value })}
                  defaultValue='10' 
                  min='10'
                  max='1000'
                  step='10'
                  disabled={usaValidade?true:false}
                />
                <br/><br/>
                <strong>Quantidade por dias:</strong>&nbsp;&nbsp;  
                <select disabled={usaValidade?false:true} onChange={e => this.setState({ dia: e.target.value })}>
                    {
                      dias.map( dia => (
                        <option key={dia*1.618} value={dia}>{dia}</option>
                      ))
                    } 
                </select>
              </div> {/*className='informacoes'*/}
              <div className='pagamento'>
                  <p>Simula Pagamento:</p>
                  <strong>Pagar: </strong>&nbsp;&nbsp;
                <input type="checkbox" id="pagar" onClick={() => {pagar()}}/>
                <br/><br/>
                <button className='btConfirma' title='Confirmar Compra' onClick={() => {this.fecharVenda()}}>
                  Comprar
                </button>
              </div>{/*className='pagamento'*/}
            </div>{/*className='estrutura'*/}
        </Div>
    )
  }
}