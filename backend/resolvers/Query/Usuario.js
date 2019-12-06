const { usuarios } = require('../../data/db')
const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../Public/Usuario')

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

module.exports = {
    async login(_, {dados}){
        const usuario = usuarios.filter(u => u.email === dados.email)[0]
        
        if(!usuario){
            throw new Error('Usuario ou senha inválidos!')
        }

        const senhaCorreta = bcrypt.compareSync(dados.senha, usuario.senha)
        
        if(!senhaCorreta){
            throw new Error('Usuario ou senha inválidos!')
        }
        return getUsuarioLogado(usuario)
    },
    usuarios(parent, args, ctx){
        ctx && ctx.validarAdmin()
        return usuarios
    },
    usuario(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro(filtro)
        let i = indiceUsuario(filtro)
        return usuarios[i]
    },
}