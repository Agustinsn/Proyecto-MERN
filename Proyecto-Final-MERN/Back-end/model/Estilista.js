const {Schema, model} = require('mongoose')

const EstilistaSchema= Schema({
    nombre: String,
    foto:String,
    descripcion:String
})

module.exports=model('Estilista', EstilistaSchema)
