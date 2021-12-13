const mongoose = require('mongoose')
const validator = require('validator')
//Schema é a modelagem dos dados
const ContatoSchema = new mongoose.Schema({
    //Como o mongo é um noSQL eu preciso definir os parâmetros
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body) {
    this.body = body
    this.errors = []
    this.contato = null
}

Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return
    const user = await ContatoModel.findById(id)
    return user
}

Contato.prototype.register = async function(){
    this.valida()
    if(this.errors.length >0) return
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function(){
    this.cleanUp()

    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido.')
    if(!this.body.nome) this.errors.push('Campo nome é obrigatório')
    if(!this.body.email && !this.body.telefone){
        this.errors.push('Coloque ao menos um contato')
    }
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = ''
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}



module.exports = Contato