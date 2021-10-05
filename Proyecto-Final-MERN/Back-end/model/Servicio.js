const {Schema, model} = require('mongoose')

const ServicioSchema= Schema({
    nombre: String,
    precio:Number,
    foto: String,
    descripcion:String

})

module.exports=model('Servicio', ServicioSchema)
