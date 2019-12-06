const { perfis, usuarios_perfis, proximoId2 } = 
    require('../../data/db')

function indicePerfil(filtro) {
    if(!filtro) return -1
    const { id, nome } = filtro
    if(id) {
        return perfis
            .findIndex(p => p.id === id)
    } else if(nome) {
        return perfis
            .findIndex(p => p.nome === nome)
    }
    return -1
}

module.exports = {
    novoPerfil(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()
        const nomeExistente = perfis
            .some(u => u.nome === dados.nome)

        if(nomeExistente) {
            throw new Error('Perfil cadastrado')
        }

        const novo = {
            id: proximoId2(),
            ...dados
        }

        perfis.push(novo)
        return novo
    },
    excluirPerfil(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        const i = indicePerfil(filtro)
        if(i < 0) return null
        //Excluir todos ligamentos do perfil
        for(let j in usuarios_perfis){
            if(usuarios_perfis[j].perfil_id === perfis[i].id){
               usuarios_perfis[j] = {} //apagar estava dando erro
            }                          //com banco de dados funciona melhor
        }
        const excluidos = 
            perfis.splice(i, 1)
        return excluidos ? 
            excluidos[0] : null
    },
    alterarPerfil(_, { filtro, dados }, ctx) {
        ctx && ctx.validarAdmin()
        const i = indicePerfil(filtro)
        if(i < 0) return null

        const perfil = {
            ...perfis[i],
            ...dados
        }

        perfis.splice(i, 1, perfil)
        return perfil
    }
}