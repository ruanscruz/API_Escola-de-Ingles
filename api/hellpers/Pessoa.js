class Pessoa {
  constructor ({ nome, ativo, email, role }) {
    this.nome = nome
    this.ativo = ativo
    this.email = email
    this.role = role
  }

  validaPessoa () {
    const campos = ['nome', 'email', 'role']

    if (this.ativo.length === 0 || typeof this.ativo !== 'boolean') { throw new Error('Campo ativo está inválido!') }

    campos.forEach(campo => {
      const valor = this[campo]
      if (valor.length === 0 || typeof valor !== 'string') { throw new Error(`Campo '${campo}' está inválido!`) }
    })

    return true
  }

  verificaCampos () {
    const campos = ['nome', 'ativo', 'email', 'role']
    const camposParaAtualizar = {}
    campos.forEach(campo => {
      const valor = this[campo]
      if (valor !== undefined && valor.length > 0) camposParaAtualizar[campo] = valor
    })

    if (Object.keys(camposParaAtualizar).length === 0) { throw new Error('Não há dados para atualizar') }

    return true
  }
}

module.exports = Pessoa
