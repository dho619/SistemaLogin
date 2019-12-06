const {usuarios, perfis, usuarios_perfis} = require('../data/db')
const { getUsuarioLogado } = require('../resolvers/Public/Usuario')

const id_admin = usuarios_perfis.findIndex(up => up.perfil_id===1)
const id_comum = usuarios_perfis.findIndex(up => up.perfil_id===3)

const id_pes = usuarios_perfis[id_admin].usuario_id

const usuario = usuarios.filter(u => u.id === id_pes)[0]

module.exports = async req => {
    const { token }= await getUsuarioLogado(usuario)
    req.headers = {
        authorization: `Bearer ${token}`
    }
}