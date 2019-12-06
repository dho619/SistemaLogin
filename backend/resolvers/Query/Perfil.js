const { perfis } = require('../../data/db')

module.exports = {
    perfis(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return perfis
    },
    perfil(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        if (!filtro) return null
        let { id, nome } = filtro
        let perfil= {}
        if(id){
            perfil = perfis
                    .filter(p => p.id === id)
        } else if(nome) {
            perfil = perfis
                    .filter(p => p.nome === nome)
        }
        return perfil[0]
    }
}