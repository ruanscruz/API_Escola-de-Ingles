const database = require('../models')
const Pessoa = require('../hellpers/Pessoa')

const validaPessoaExiste = async (id) => {
  const pessoaValida = await database.Pessoas.findOne({
    where: { id: id }
  })
  if (!pessoaValida) throw new Error('Pessoa não localizada!')

  return true
}

class PessoaController {
  static async listarPessoas (_, res, next) {
    try {
      const pessoas = await database.Pessoas.findAll()
      if (pessoas) res.status(200).json(pessoas)
      else throw new Error('Não foram encontrados dados de pessoas!')
    } catch (error) { res.status(400).send({ mensagem: error.message }) }
  }

  static async selecionarPessoa (req, res, next) {
    try {
      const { idPessoa } = req.params
      const pessoa = await database.Pessoas.findOne({
        where: { id: idPessoa }
      })

      if (pessoa) res.status(200).json(pessoa)
      else throw new Error('Pessoa não localizada!')
    } catch (error) { res.status(400).send({ mensagem: error.message }) }
  }

  static async criarPessoa (req, res, next) {
    try {
      const pessoa = new Pessoa(req.body)
      pessoa.validaPessoa()
      await database.Pessoas.create(pessoa)
      res.status(201).json(pessoa)
    } catch (error) { res.status(400).send({ mensagem: error.message }) }
  }

  static async atualizarPessoa (req, res, next) {
    try {
      const { idPessoa } = req.params
      const dadosPraAtualizar = Object.assign({}, req.body, { id: idPessoa })
      const pessoaAtualizar = new Pessoa(dadosPraAtualizar)

      pessoaAtualizar.verificaCampos()
      await validaPessoaExiste(idPessoa)

      await database.Pessoas.update(pessoaAtualizar, { where: { id: idPessoa } })
      res.status(204).end()
    } catch (error) { res.status(400).send({ mensagem: error.message }) }
  }

  static async deletarPessoa (req, res, next) {
    try {
      const { idPessoa } = req.params
      await validaPessoaExiste(idPessoa)

      await database.Pessoas.destroy({ where: { id: idPessoa } })
      res.status(204).end()
    } catch (error) { res.status(400).send({ mensagem: error.message }) }
  }
}

module.exports = PessoaController
