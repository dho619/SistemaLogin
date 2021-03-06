//Importando dependecias
require('dotenv').config('.env')
const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')

//Importando arquivos em outras pastas
const resolvers = require('./resolvers')//le o arquivo index da pasta
const typeDefs = importSchema('./schemas/index.graphql')
const context = require('./config/context')

//Construindo servidor Apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

//Iniciando o Servidor - Se nada e passado pro listen, entao ele executa na porta 4000
server.listen(4000).then(( { url }) => {
    console.log(`Executando em ${url}`)
})