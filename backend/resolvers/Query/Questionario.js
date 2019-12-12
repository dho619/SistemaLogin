const { questionarios } = require('../../data/db')

module.exports = {
    questionarios(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return questionarios
    },
    questionario(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        if (!filtro) return null
        let { id, nome } = filtro
        let questionario= {}
        if(id){
            questionario = questionarios
                    .filter(p => p.id === id)
        } else if(nome) {
            questionario = questionarios
                    .filter(p => p.nome === nome)
        }
        return questionario[0]
    }
}