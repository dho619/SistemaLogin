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
        perfil_id: 2,
    },
    {
        id: proximoId3(),
        usuario_id: 3,
        perfil_id: 2,
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
        nome: 'Comum 2',
        email: 'teste2@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste3@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste4@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste5@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste6@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste7@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste8@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste9@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste10@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste11@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste12@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'Comum',
        email: 'teste13@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
]

module.exports = { usuarios, perfis, proximoId, proximoId2, proximoId3, usuarios_perfis}