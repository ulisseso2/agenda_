import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css';

import Login from './modules/Login'
import Contatos from './modules/Contatos'

const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')

login.init() 
cadastro.init()

const contatos = new Contatos('.form-contato')
contatos.init()