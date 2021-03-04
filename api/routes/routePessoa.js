const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.post('/pessoas', PessoaController.criarPessoa)
router.get('/pessoas', PessoaController.listarPessoas)
router.get('/pessoas/:idPessoa', PessoaController.selecionarPessoa)
router.put('/pessoas/:idPessoa', PessoaController.atualizarPessoa)
router.delete('/pessoas/:idPessoa', PessoaController.deletarPessoa)

module.exports = router
