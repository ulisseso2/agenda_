//const { get } = require('core-js/core/dict')
const express = require('express')//chama o express para as rotas
const route = express.Router()//cria variável route com express.Route
const homeController = require('./src/controllers/homeController')//chamando os controllers para as rotas
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/meumiddleware')


route.get('/', homeController.index)


// rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/index/:id', loginRequired, contatoController.editIndex)

module.exports = route