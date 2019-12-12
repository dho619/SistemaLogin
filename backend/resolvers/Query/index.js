const Usuario = require('./Usuario')
const Perfil = require('./Perfil')
const Questionario = require('./Questionario')
const Plano = require('./Plano')

module.exports = {
    ...Usuario,
    ...Perfil,
    ...Questionario,
   ...Plano,
}