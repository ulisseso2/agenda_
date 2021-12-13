const mongoose = require('mongoose')
//Schema é a modelagem dos dados
const HomeSchema = new mongoose.Schema({
    //Como o mongo é um noSQL eu preciso definir os parâmetros
    titulo: { type: String, required: true},
    descricao: { type:String }
})

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel