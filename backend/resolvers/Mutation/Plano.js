const { planos, quest_Planos, questionarios,proximoId7, proximoId8 } = require('../../data/db')
const { plano: obterPlano } = require('../Query/Plano')
const { questionario: obterQuestionario } = require('../Query/Questionario')


module.exports = {
    novoPlano(_, { dados }, ctx) {
        ctx.validarUsuario()

        var questionarios = []

        if(dados.questionarios && dados.questionarios.length){
            questionarios = dados.questionarios
            delete dados.questionario
        }
        
        const novo = {
            id: proximoId7(),
            data_Inicio: new Date(),
            ativo: true,
            ...dados
        }

        planos.push(novo)

        //adicionando questionarios
        for(filtro of questionarios){
            let questionario = obterQuestionario(_, {filtro}, ctx)
            if(questionario){
                let novoQuest = {
                    id: proximoId8(),
                    plano_id: novo.id,
                    questionario_id: questionario.id
                }
                quest_Planos.push(novoQuest)
            }
        }
        return novo
    },
    excluirPlano(_, { filtro }, ctx) {
        const { id } = filtro

        if (!id) throw new Error('Filtro nescessario!')
        
        plano = obterPlano(_, filtro, ctx)
        ctx.validarUsuarioFiltro({id: plano.usuario_id})
        
        let i = planos.findIndex(p => p.id === id)
        planoAlterado = {
            ...plano,
            ativo: false,
        }
        plano.splice(i, 1, planoAlterado)

        return planoAlterado
    },

    alterarPlano(_, { filtro, dados }, ctx) {
        const { id } = filtro

        if (!id) throw new Error('Filtro nescessario!')
        
        plano = obterPlano(_, filtro, ctx)
        ctx.validarUsuarioFiltro({id: plano.usuario_id})

        const planoAlterado = {
            ...plano,
            ...dados
        }

        plano.splice(i, 1, planoAlterado)
        return planoAlterado
    }
}