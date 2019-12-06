const { usuarios_perfis, usuarios } = require('../../data/db')

module.exports = {
    usuarios(perfil){
        let ids = []
        //Pegando os ids de usuarios
        for (let up of usuarios_perfis){
            if(up.perfil_id === perfil.id){
                ids.push(up.usuario_id)
            }
        }
        let usuariosDoPerfil = []
        //Pegando os usuarios
        for (usuario of usuarios){
            if(ids.includes(usuario.id)){
                usuariosDoPerfil.push(usuario)
            }
        }
        return usuariosDoPerfil
    }
}