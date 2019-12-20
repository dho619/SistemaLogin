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

let id4 = 1
function proximoId4(){
    return id4++
}
let id5 = 1
function proximoId5(){
    return id5++
}

let id6 = 1
function proximoId6(){
    return id6++
}

let id7 = 1
function proximoId7(){
    return id7++
}

let id8 = 1
function proximoId8(){
    return id8++
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
        nome: 'Arya Stark',
        email: 'teste2@teste.com',
        senha: criptografarSenha('123'),
        ativo: true,
        created_at: new Date,
        updated_at: new Date
    },
    {
        id: proximoId(),
        nome: 'João das Neves',
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

const questionarios = [
    {
        id: proximoId4(),
        nome: 'Questionario 01',
        public: true,
        ativo: true
    },
    {
        id: proximoId4(),
        nome: 'Questionario 02',
        public: false,
        ativo: true
    }
]

const perguntas = [
    {
        id: proximoId5(),
        questionario_id: 1,
        descricao: 'Qual seu animal favorito, dentre as opcões?',
    },
    {
        id: proximoId5(),
        questionario_id: 1,
        descricao: 'Qual sua cor favorita dentre as opcões?',
    },
    {
        id: proximoId5(),
        questionario_id: 1,
        descricao: 'Qual seu transporte favorito dentre as opcões?',
    },
    {
        id: proximoId5(),
        questionario_id: 2,
        descricao: 'Você se considera?',
    },
    {
        id: proximoId5(),
        questionario_id: 2,
        descricao: 'Qual seu estilo de filme favorito dentre as opções?',
    },
    {
        id: proximoId5(),
        questionario_id: 2,
        descricao: 'Qual opção mais encaixa à seu objetivo na vida?',
    },
]

const opcoes = [
    {
        id: proximoId6(),
        pergunta_id: 1,
        descricao: 'Cachorro',
    },
    {
        id: proximoId6(),
        pergunta_id: 1,
        descricao: 'Gato',
    },
    {
        id: proximoId6(),
        pergunta_id: 1,
        descricao: 'Peixe',
    },
    {
        id: proximoId6(),
        pergunta_id: 2,
        descricao: 'Azul',
    },
    {
        id: proximoId6(),
        pergunta_id: 2,
        descricao: 'Vermelho',
    },
    {
        id: proximoId6(),
        pergunta_id: 2,
        descricao: 'Verde',
    },
    {
        id: proximoId6(),
        pergunta_id: 3,
        descricao: 'Táxi',
    },
    {
        id: proximoId6(),
        pergunta_id: 3,
        descricao: 'MotoTaxi',
    },
    {
        id: proximoId6(),
        pergunta_id: 3,
        descricao: 'Transporte Público',
    },
    {
        id: proximoId6(),
        pergunta_id: 4,
        descricao: 'Tímido',
    },
    {
        id: proximoId6(),
        pergunta_id: 4,
        descricao: 'Extrovertido',
    },
    {
        id: proximoId6(),
        pergunta_id: 4,
        descricao: 'Sério',
    },
    {
        id: proximoId6(),
        pergunta_id: 5,
        descricao: 'Terror',
    },
    {
        id: proximoId6(),
        pergunta_id: 5,
        descricao: 'Comédia',
    },
    {
        id: proximoId6(),
        pergunta_id: 5,
        descricao: 'Ação',
    },
    {
        id: proximoId6(),
        pergunta_id: 6,
        descricao: 'Pessoal',
    },
    {
        id: proximoId6(),
        pergunta_id: 6,
        descricao: 'Profissional',
    },
    {
        id: proximoId6(),
        pergunta_id: 6,
        descricao: 'Familiar',
    },
]

const planos = [
    {
        id: proximoId7(),
        usuario_id: 2,
        data_Inicio: new Date,
        data_Fim: new Date(Math.floor(new Date)+ (5*60*1000)),//5min em milisegundos
        unidades: null,
        unid_Consumidas: null,
        ativo: true
    },
    {
        id: proximoId7(),
        usuario_id: 3,
        data_Inicio: new Date,
        data_Fim: null,
        unidades: 10,
        unid_Consumidas: 0,
        ativo: true        
    }
]

const quest_Planos = [
    {
        id: proximoId8(),
        plano_id: 1,
        questionario_id: 1,
    },
    {
        id: proximoId8(),
        plano_id: 1,
        questionario_id: 2,
    },
    {
        id: proximoId8(),
        plano_id: 2,
        questionario_id: 1,
    }
]

module.exports = { 
    usuarios, perfis, usuarios_perfis,
    questionarios, perguntas, opcoes,
    planos, quest_Planos, proximoId7, proximoId8,
    proximoId, proximoId2, proximoId3
}