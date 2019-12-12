const { quest_Planos, questionarios } = require('../../data/db')

function formataData(data){
    let dia     = ("0" + data.getDate()).slice(-2); // 1-31 -- o slice e o 0 e pra quando ter apenas um numero 
    // let dia_sem = data.getDay();            // 0-6 (zero=domingo)
    let mes     = data.getMonth();          // 0-11 (zero=janeiro)
    // let ano2    = data.getYear();           // 2 dígitos
    let ano4    = data.getFullYear();       // 4 dígitos
    let hora    = ("0" + data.getHours()).slice(-2);          // 0-23
    let min     = ("0" + data.getMinutes()).slice(-2);        // 0-59
    let seg     = ("0" + data.getSeconds()).slice(-2);        // 0-59
    // let mseg    = data.getMilliseconds();   // 0-999
    // let tz      = data.getTimezoneOffset(); // em minutos

    // Formata a data e a hora
    let str_data = dia + '/' + (mes+1) + '/' + ano4;
    let str_hora = hora + ':' + min + ':' + seg;

    return str_data + ' - ' + str_hora
}

module.exports = {
    questionarios(plano){
        let ids = []
        //Pegando os ids dos questionarios
        for (let qp of quest_Planos){
            if(qp.plano_id === plano.id){
                ids.push(qp.questionario_id)
            }
        }

        let questPlanos = []
        //Pegando os questionarios
        for (let questionario of questionarios){
            if(ids.includes(questionario.id)){
                questPlanos.push(questionario)
            }
        }
        return questPlanos
    },
    data_Inicio(plano){
        return formataData(plano.data_Inicio)
    },
    data_Fim(plano){
        //Caso nao tenha data fim, sair
        if (!plano.data_Fim) return null

        return formataData(plano.data_Fim)
    }
}