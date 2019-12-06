const bcrypt = require('bcrypt-nodejs')

let id = 1
function proximoId(){
    return id++
}
let id2 = 1
function proximoId2(){
    return id2++
}

let id3 = 1
function proximoId3(){
    return id3++
}

function criptografarSenha(senha){
    //criptografia da senha
    const salt = bcrypt.genSaltSync()
    senha = bcrypt.hashSync(senha, salt)
    return senha
}

const usuarios_perfis = [
    {
        id: proximoId3(),
        usuario_id: 1,
        perfil_id: 1,
    },
    {
        id: proximoId3(),
        usuario_id: 2,
        perfil_id: 3,
    },
    {
        id: proximoId3(),
        usuario_id: 3,
        perfil_id: 3,
    }
]

const perfis = [
    {
        id: proximoId2(),
        nome: 'admin',
        rotulo: 'Administrador'
    },
    {
        id: proximoId2(),
        nome: 'comum',
        rotulo: 'Comum'
    }
]

const usuarios = [
    {
        id: proximoId(),
        nome: 'Admin',
        email: 'teste@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'comum',
        email: 'teste3@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    }
]

module.exports = { usuarios, perfis, proximoId, proximoId2, proximoId3, usuarios_perfis}