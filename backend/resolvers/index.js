const Usuario = require('./Type/Usuario')
const Perfil = require('./Type/Perfil')
const Query = require('./Query') //pega o arquivo index dentro da pasta Query
const Mutation = require('./Mutation') //pega o arquivo index dentro da pasta Mutation

module.exports = {
    Query,
    Mutation,
    Usuario,
    Perfil
}