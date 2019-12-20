const { planos, usuarios } = require('../../data/db')

function idUsuario(filtro) {
    if(!filtro) return -1

    const { id, email } = filtro
    if(id) {
        let indice = usuarios.findIndex(u => u.id === id)
        return usuarios[indice].id
    } else if(email){
        let indice = usuarios.findIndex(u => u.email === email)
        return usuarios[indice].id
    }
    return -1
}

module.exports = {
    planos(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return planos
    },
    plano(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro({id: filtro.usuario_id})
        let { id } = filtro
        if (!id) return null
        let plano= {}
        if(id){
            plano = planos
                    .filter(p => p.id === id)
        } else return null
        return plano[0]
    },
    planosUsuario(_, { filtro }, ctx) {
        if (!filtro) return null
        ctx && ctx.validarUsuarioFiltro(filtro)
        const id  = idUsuario(filtro)
        let PlanosUsuario= {}
        if(id > 0){
            PlanosUsuario = planos
                    .filter(p => p.usuario_id === id)
        } else return null

        return PlanosUsuario
    }
}