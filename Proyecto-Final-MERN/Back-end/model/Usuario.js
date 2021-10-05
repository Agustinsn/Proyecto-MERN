const {Schema, model} = require('mongoose')

const UsuarioSchema= Schema({
    nombre: String,
    numero:Number,
    correo:String,
    descripcion:String,
    servicioNom:String,
    estilista:String,
    fecha:Number,
    hora:Number,
    estado:String,
})

module.exports=model('Usuario', UsuarioSchema)
