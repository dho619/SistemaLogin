import styled from "styled-components"

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-width: 40%;
    padding: 20px 60px 20px 60px;
    button {
            padding: 5px;
            border-radius: 5px; /*Arrendondar as bordas*/
            border: 0;
            margin: 5px;
            background: #8B0000;
            color: #FFF;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer; /*Muda a seta do mouse para a maozinha em cima do botao*/
        }    
    button:hover {
        opacity: 0.7;
    }
    .btRight {
        float: right;
    }
    .esquerda{
        min-width: 40%;
        max-width: 65%;
        border: 2pt solid black;
        background-color: #87CEFA;
        margin: 5px;
        .BotoesQuest{
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start;
        }      
        header {
            border-bottom: 2pt solid black;
            padding: 4px;
            background-color: #708090;
            h3 {
            font-size: 16px;
            font-style: oblique;
            }
        }
        .body{
            height: 300px;
            overflow: auto;
            border-bottom: 2pt solid black;
            .questionarios {
                margin: 5px;
                border-bottom: 2pt dotted black;
                p {
                    color: red;
                }
                .perguntas {
                    
                    p {
                        color: black;
                        font-size: 9pt;
                    }
                    .opcoes {
                        margin: 10px;
                        li {
                            font-size: 9pt;
                        }
                    }
                }
            }
        }
    }
    .direita{
        margin: 5px;
        border: 2pt solid black;
        min-width: 20%;
        max-width: 35%;
        min-height: 300px;
        background-color: #B0C4DE;
        button {
            background: #708090;
        }
        header {
            border-bottom: 2pt solid black;
            padding: 4px;
            background-color: #708090;
            h3 {
                font-size: 16px;
                font-style: oblique;
                color: #FFF;
            }
        }
        .body{
            height: 200px;
            overflow: auto;
            border-bottom: 2pt solid black;
            .questionarios {
                border-bottom: 1pt solid gray;
                display: flex;
                justify-content: space-between; 
                align-items: center;
                strong {
                    margin: 5px;
                    color: #708090;
                }
            }
        }
        .footer{
            display: flex;
            justify-content: space-between; 
            align-items: center;
            padding: 5px;
            .icon{
                height: 20pt;   
            }
        }
    }
`

export default Div