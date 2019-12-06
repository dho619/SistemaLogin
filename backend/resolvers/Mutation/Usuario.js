const bcrypt = require('bcrypt-nodejs')
const { usuarios, usuarios_perfis, proximoId, proximoId3 } = require('../../data/db')
const { perfil: obterPerfil } = require('../Query/Perfil.js')

function indiceUsuario(filtro) {
    if(!filtro) return -1

    const { id, email } = filtro
    if(id) {
        return usuarios.findIndex(u => u.id === id)
    } else if(email){
        return usuarios.findIndex(u => u.email === email)
    }
    return -1
}

const mutations = {
    registrarUsuario(_,{ dados }){
        return mutations.novoUsuario(_,{
            dados: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
            }
        })
    },
    novoUsuario(_, { dados }, ctx){
        ctx && ctx.validarAdmin()
        const emailExistente = usuarios
            .some(u=> u.email === dados.email)

        if (emailExistente){
            throw new Error('Esse email já está cadastrado!')
        }
        
        //pegando ids dos perfis passados
        const idsPerfis = []
        if(dados.perfis){
            var perfil = null
            for (filtro of dados.perfis){
                perfil = obterPerfil(_, {filtro})
                if(perfil){
                    idsPerfis.push(perfil.id)
                }
            }
        }
        delete dados.perfis
        //Se esta vazio os ids perfis, adiciona o de comum
        if(!idsPerfis.length){
            let perfil = obterPerfil(_, {filtro: {nome: "comum"}})
            idsPerfis.push(perfil.id)
        }

        //criptografia da senha
        const salt = bcrypt.genSaltSync()
        dados.senha = bcrypt.hashSync(dados.senha, salt)
        const novo = {
            id: proximoId(),
            ...dados,
            ativo: true,
            created_at: new Date(),
            updated_at: new Date()
        }
        usuarios.push(novo)

        for (perfil_id of idsPerfis){
            let up =
            {
                id: proximoId3(),
                usuario_id: novo.id,
                perfil_id: perfil_id,
            }
            usuarios_perfis.push(up)
        }
        return novo
    },
    excluirUsuario(_, { filtro }, ctx){
        ctx && ctx.validarAdmin()
        const i = indiceUsuario(filtro)
        //Excluir todos ligamentos de usuarios
        for(let j in usuarios_perfis){
            if(usuarios_perfis[j].usuario_id === i){
                usuarios_perfis[j] = {} //apagar estava dando erro
            }                       //com banco de dados funciona melhor
            
        }

        const excluidos = usuarios.splice(i, 1)

        return excluidos ? excluidos[0]: null
    },
    alterarUsuario(_, {filtro, dados}, ctx){
        ctx && ctx.validarUsuarioFiltro(filtro)
        const i = indiceUsuario(filtro)
        if (i < 0) return null

        if (ctx.admin && dados.perfis) {
            //Excluir todos ligamentos de usuarios
            for(let j in usuarios_perfis){
                if(usuarios_perfis[j].usuario_id === usuarios[i].id){
                    usuarios_perfis[j] = {} //apagar estava dando erro
                }                       //com banco de dados funciona melhor
            }
            //Adicionar perfis passados
            var perfil = null
            const idsPerfis = []
            for (filtro of dados.perfis){
                perfil = obterPerfil(_, {filtro})
                if(perfil){
                    idsPerfis.push(perfil.id)
                }
            }
            //Se esta vazio os ids perfis, adiciona o de comum
            if(!idsPerfis.length){
                let perfil = obterPerfil(_, {filtro: {nome: "comum"}})
                idsPerfis.push(perfil.id)
            }
            for (perfil_id of idsPerfis){
                let up =
                {
                    id: proximoId3(),
                    usuario_id: usuarios[i].id,
                    perfil_id: perfil_id,
                }
                usuarios_perfis.push(up)
            }
            delete dados.perfis
        }

        if(dados.senha){
            //criptografia da senha
            const salt = bcrypt.genSaltSync()
            dados.senha = bcrypt.hashSync(dados.senha, salt)
        }
        
        const usuario = {
            ...usuarios[i],
            ...dados,
            updated_at: new Date
        }
        usuarios.splice(i, 1, usuario)

        return usuario
    }
}

module.exports = mutations