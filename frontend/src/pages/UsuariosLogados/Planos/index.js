import React, { Component } from "react";
import { Link } from 'react-router-dom';
import gql from "graphql-tag"

import Form from './styles'
import api from '../../../services/api';
import { getUsuarioLogado } from '../../../services/auth';
import iconNew from '../../../assets/IconNew.png';

export default class Planos extends Component {
    // usa-se o state para poder acessar essas variaveis externamente
    state = { //state e um objeto
        Usuario: {},
        Planos: [],
        page: 0,
        PlanoInfo: {}
    }

    //componentDidMount executa assim que e criado a pagina
    async componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        const Usuario = await getUsuarioLogado()
        this.setState({Usuario})
        this.loadPlano();
    }

    loadPlano = async (page = 0) => {
        const { Usuario } = this.state
        await api.query({
            query: gql`
                query(
                    $id: Int
                )
                {
                    planosUsuario(
                        filtro: { id: $id }
                    ){
                        id data_Inicio data_Fim unidades unid_Consumidas
                    }
                }
            `,
            variables: {
                id: Usuario.id,
            }
        }).then(response => {
            //Simular uma paginasao, ate eu coloca-la no backend ou retirar
            var Planos = []
            var aux = []
            for(let Plano of response.data.planosUsuario){
                if(aux.length < 10){
                    aux.push(Plano)
                }else {
                    Planos.push(aux)
                    aux = []
                }
            }
            if (aux.length > 0) Planos.push(aux)
            this.setState({ Planos: Planos[page], PlanoInfo: {pages: Planos.length-1}});
        }).catch(e => {
            console.log(e)
        })       
    };

    prevPage = () => {
        const { page } = this.state;

        //se esta na primeira pagina, ja retorna sem fazer nada
        if (page === 0) return;

        let pageNumber = page - 1;

        this.setState({page: pageNumber})
        
        this.loadPlano(pageNumber);
    }

    nextPage = () => {
        const { page, PlanoInfo} = this.state;
        
        //se esta na ultima pagina, ja retorna sem fazer nada
        if (page === PlanoInfo.pages) return;

        const pageNumber = page + 1;

        this.setState({page: pageNumber})
        this.loadPlano(pageNumber);//chamando a funcao de mostrar a pagina
    }

    render() {
        const { Planos, page, PlanoInfo} = this.state; //desistruturando
        return (
            <Form>
                <div className='header'>
                    <h1>Seus Planos Cadastrados:</h1>{/*alt='' e por questao de acessibilidade, ele fornece o que e aquela imagem, para deficientes visuais ou navegacao apenas de texto*/}
                    <Link to={`/adquirirPlano`} title='Novo Plano' className='btIcon'><img alt='Imagem Novo Plano' src={iconNew}/></Link>    
                </div>
                {//aqui codigo javascript, apos "=> (" volta a ser html
                    Planos.map(Plano => (
                            <article key={Plano.id}>
                                <strong>ID: {Plano.id}</strong>
                                <br/>
                                <strong>Inicio do plano: {Plano.data_Inicio}</strong>
                                <br/>
                                <strong>Fim do Plano: {Plano.data_Fim}</strong>
                                <br/>
                                <strong>Unidades Compradas: {Plano.unidades}</strong>
                                <br/>
                                <strong>Unidades Consumidas: {Plano.unid_Consumidas}</strong>
                                <Link to={`/Plano/${Plano.id}`}>Ver Questionarios desse Plano</Link>
                            </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === PlanoInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </Form>
        )
    }
}