import React, { Component } from "react"
import gql from "graphql-tag"

import api from '../../../services/api'
import { getUsuarioLogado } from '../../../services/auth';
import Div from './styles'

export default class QuestsPlano extends Component {
    state = { //state e um objeto
        id: 0,
        Questionarios: [],
        page: 0,
        exibirPerg : false,
        QuestInfo: {}
    }

    //componentDidMount executa assim que e criado a pagina
    async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        let id = parseInt(this.props.match.params.id);
        let Usuario = await getUsuarioLogado()
        this.setState({id, Usuario})
        this.loadQuest();
    }

    loadQuest = async (page = 0) => {
        const { id, Usuario } = this.state
        await api.query({
            query: gql`
                query(
                    $id: Int
                    $usuario_id: Int
                )
                {
                    plano(
                        filtro: { id: $id usuario_id: $usuario_id }
                    ){
                        questionarios { id, nome, perguntas { id descricao opcoes { id descricao }}}
                    }
                }
            `,
            variables: {
                id,
                usuario_id: Usuario.id,
            }
        }).then(response => {
            //Simular uma paginasao, ate eu coloca-la no backend ou retirar
            var Quests = []
            var aux = []
            for(let quest of response.data.plano.questionarios){
                if(aux.length < 10){
                    aux.push(quest)
                }else {
                    Quests.push(aux)
                    aux = []
                    aux.push(quest)
                }
            }
            if (aux.length > 0) Quests.push(aux)
            this.setState({ Questionarios: Quests[page], QuestInfo: {pages: Quests.length-1}});
        }).catch(e => {
            console.log(e)
        })       
    };

    exibirPerguntas = () => {
        this.setState({exibirPerg: !this.state.exibirPerg})
    }

    render(){
        const { Questionarios, page, QuestInfo} = this.state; //desistruturando
        return (
            <Div>
                <div className='header'>
                    <h1>Questionários do plano de id {this.state.id}:</h1>
                </div>
                {//aqui codigo javascript, apos "=> (" volta a ser html
                Questionarios.map(Questionario => (
                            <article key={Questionario.id}>
                                <strong>ID: {Questionario.id}</strong>
                                <br/>
                                <strong>Nome do Questionário: {Questionario.nome}</strong>
                                <br/>
                                <strong>Perguntas do Questionário: <button onClick={this.exibirPerguntas}>Exibir</button> </strong>
                                <br/>
                                <ul>
                                {   this.state.exibirPerg &&
                                    Questionario.perguntas.map(pergunta => (
                                    <article key={pergunta.id}>
                                        <br/>
                                        <strong>Pergunta: {pergunta.descricao}</strong>
                                        <br/>
                                    </article> 
                                    ))
                                }
                                </ul>                                
                            </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === QuestInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </Div>
        )
    }
}