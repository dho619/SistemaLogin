const { usuarios_perfis, perfis } = require('../../data/db')

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
    updated_at(usuario) {
        return formataData(new Date(usuario.updated_at))
    },
    created_at(usuario) {
        return formataData(new Date(usuario.created_at))
    },
    perfis(usuario){
        let ids = []
        //Pegando os ids de perfis
        for (let i in usuarios_perfis){
            if(usuarios_perfis[i].usuario_id === usuario.id){
                ids.push(usuarios_perfis[i].perfil_id)
            }
        }
        let perfisDoUsuario = []
        //Pegando os perfis
        for (let i in perfis){
            if(ids.includes(perfis[i].id)){
                perfisDoUsuario.push(perfis[i])
            }
        }
        return perfisDoUsuario
    }
}