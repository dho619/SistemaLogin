import styled from "styled-components"

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    button {
            padding: 5px;
            border-radius: 5px; /*Arrendondar as bordas*/
            border: 0;
            margin: 5px;
            background: #708090;
            color: #FFF;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer; /*Muda a seta do mouse para a maozinha em cima do botao*/
        }    
    button:hover {
        opacity: 0.7;
    }
    .btConfirma {
        float: right;
        font-size: 15px;
    }
    .estrutura {
        min-width: 40%;
        min-height: 450px;
        border: 2pt solid #000000;
        background-color: #B0C4DE;
        .header{
            background-color: #708090;
            padding: 5px;
            display: flex;
            justify-content: left; 
            align-items: center;
            border-bottom: 2pt solid #000000;
            strong {
                font-size: 15pt;
            }
            .icon{
                margin-right: 5px;
                height: 20pt;  
            }
        }
        .listaQuest{
            padding: 20px;
            display: flex;
            justify-content: space-between; 
            align-items: center; 
            border-bottom: 2pt dotted black;
            .itens {
                border: 2pt solid black;
                margin: 15px;
                padding: 10px;
                min-height: 90px;
                max-height: 120px;
                width: 50%;
                overflow: auto;
                background-color: #FFF;
                .questionarios {
                    display: flex;
                    justify-content: space-between; 
                    align-items: center;                 
                }
            }
        }
        .informacoes {
                border-bottom: 2pt dotted black;
                padding: 10px;
        }
        .pagamento {
            padding: 10px;
        }
    }
`

export default Div
