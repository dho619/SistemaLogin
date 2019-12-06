import React from 'react';

import "./styles.css"; //importando o css

// cria um "componente", tipo uma classe, mas nao tem estado
const Footer = () => (
    <footer id="rodape">{/*usado rel="..." em link por questoes de seguranca, ler mais aqui: https://mathiasbynens.github.io/rel-noopener/#hax */}
        <p>Copyright &copy; 2019 - by Astek Sistemas<br/>
            <a id="link" rel="noopener noreferrer" href="http://asteksistemas.com.br/" target="_blank">Astek Sistemas</a> |
            <a id="link" rel="noopener noreferrer" href="https://pt.linkedin.com/company/astek-sistemas" target="_blank"> Linkedin</a><br/>
            Email: ricardo@asteksistemas.com<br/>
            Site Versão Beta
        </p>
    </footer>
);

export default Footer;