const Usuario = require('./Usuario')
const Perfil = require('./Perfil')
const Questionario = require('./Questionario')

module.exports = {
    ...Usuario,
    ...Perfil,
    ...Questionario,
}