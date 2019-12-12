const { planos } = require('../../data/db')

module.exports = {
    planos(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return planos
    },
    plano(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        if (!filtro) return null
        let { id } = filtro
        let plano= {}
        if(id){
            plano = planos
                    .filter(p => p.id === id)
        } else return null

        return plano[0]
    }
}