const { perguntas } = require('../../data/db')

module.exports = {
    perguntas(questionario){
        let ids = []
        //Pegando os ids das perguntas
        for (let p of perguntas){
            if(p.questionario_id === questionario.id){
                ids.push(p.id)
            }
        }

        let perguntasQuest = []
        //Pegando as perguntas
        for (let pergunta of perguntas){
            if(ids.includes(pergunta.id)){
                perguntasQuest.push(pergunta)
            }
        }
        return perguntasQuest
    }
}