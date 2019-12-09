import React, { Component } from 'react';

import "./styles.css"; //importando o css
import { getUsuarioLogado, isAuthenticated, logout} from '../../services/auth';
import iconLogin from '../../assets/IconLogin.png';
import iconLogout from '../../assets/IconLogout.png';

//quando abre a pagina, colocar o icone e descricao correto de login ou logout
var icon = isAuthenticated()?iconLogout:iconLogin;
var iconDesc = isAuthenticated()?'Logout':'Login';
var Link = isAuthenticated()?'/':'/signIn';

// cria um "componente", tipo uma classe, mas nao tem estado
export default class Header extends Component {
    state = {
        usuario: {}
    }
    //componentDidMount executa assim que e criado a pagina
    componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        let usuarioLogado = getUsuarioLogado()
        usuarioLogado && this.setState({usuario: usuarioLogado})
    }

    /*
    faz a alternancia do login e logout e dependendo do que foi clicado
    ou vai pra pagina de login ou desloga a conta apenas
    */
    loginOrLogout = () => {
        if (isAuthenticated()){
            logout();
            icon = iconLogin;
            iconDesc = 'Logout';
            Link = "/";
        } else {
            icon = iconLogout;
            iconDesc = 'Login';
            Link = "/signIn";
        }
    }

    render() {
        return  (
            <div className='my_header'>
                <header id="main-header">Sistema Gurren Lagann</header>
                <div className='login' >  
                    {/*So para saber que esta logado*/}
                    <a href='#'>{this.state.usuario && this.state.usuario.nome}</a>
                    {/*o alt='' em img e por questao de acessibilidade, ele fornece o que e aquela imagem, para deficientes visuais ou navegacao apenas de texto*/}
                    <a href={Link} title={iconDesc} className='IconLogInLogout' onClick= {() => {this.loginOrLogout();}}><img src={icon} alt="Imagem Login ou Logout"></img>
                        <h2>{iconDesc}</h2>
                    </a>
                </div>
            </div>
        )
    }
}
