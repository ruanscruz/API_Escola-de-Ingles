const bodyParser = require('body-parser')
const routePessoa = require('./routePessoa')

module.exports = app => {
  app.use(bodyParser.json())
  app.use('/api', routePessoa)
}
