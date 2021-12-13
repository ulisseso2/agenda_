require('dotenv').config()//Protege o caminho de conexão com o servidor

const express = require('express')//Módulo express
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=>{
        app.emit('pronto')//Emite um sinal ao app que o servidor está pronto
    })
    .catch(e => console.log(e))//Servidor MongoDB o mongoose vai modelar a base de dados


const session = require('express-session')//Controla sessões do servidor identifica e salva cookies no pc do cliente
const MongoStore = require('connect-mongo')//fala que a sessão será salva na base de dados
const flash = require('connect-flash')//mensagens auto destrutivas, bom para msg de erro e feedbaks


const routes = require('./routes')// rotas do site /home / contato /pagina inicial
const path = require('path') //Rotas(Caminhos) do app

//const helmet = require('helmet')//Segurança do site - recomendação do express

const csrf = require('csurf') // tokens para os formulários protege o site

const {middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/meumiddleware')
//São funções que são executadas nas rotas

//criado pelo sistema???


//app.use(helmet()) // usa o helmet

app.use(express.urlencoded({extended:true})) //Usa o express
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))//Arquivos que são estático e podem ser acessados diretamente no caso tudo que tiver na pasta public

const sessionOptions = session({
    secret: 'Penelope@39',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    //linha acima sofreu uma alteração por conta de mudança no protocolo. Aulas posteriores deve aparecer algo diferente
    resave: false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})//Tempo de cookie no servidor

app.use(sessionOptions)//usa o tempo de cookies das sessões
app.use(flash())//Usa a conexão com o servidor para as mensagens


app.set('views', path.resolve(__dirname, 'src', 'views'))//define views como caminho são os arquivos que renderizamos na tela
app.set('view engine' , 'ejs')//configura os ejs index como caminho das views

app.use(csrf())//Usa o csrf para protejer os formulários

//Meus middlewares//
app.use(middlewareGlobal)//Middleware definido como global, qualquer página pode usar as variáveis, não defini rota
app.use(checkCsrfError)
app.use(csrfMiddleware)

app.use(routes)// Usa as rotas

app.on('pronto', ()=>{//Essa foi a função criada para que a promises seja executada apenas quando o servidor estiver conectado

    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('servidor executando')
    })//Chama o servidor na porta 3000

})


//Para os views eu preciso avisar a endine que precisa renderizar os arquivos da pasta views