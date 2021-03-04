const database = require('../models')

class PessoaController {
    static async listarPessoas(_, res, next) {
        try {
            const pessoas = await database.Pessoas.findAll()
            if(pessoas) res.status(200).send(JSON.stringify(pessoas))
                else throw new Error('Não foram encontrados dados de pessoas!')

        } catch (error) {res.status(400).send({ mensagem: error.message })}
    }
}

module.exports = PessoaController
