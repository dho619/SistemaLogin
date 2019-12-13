const Usuario = require('./Usuario')
const Perfil = require('./Perfil')
const Plano = require('./Plano')

module.exports = {
    ...Usuario,
    ...Perfil,
    ...Plano,
}