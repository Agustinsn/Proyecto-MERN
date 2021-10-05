const express = require('express')
const app= express()
const cors= require ('cors')
const bodyParser = require('body-parser')
require('./database')
const Estilista = require('./model/Estilista')
const Usuario = require('./model/Usuario')
const Servicio = require('./model/Servicio')
const multer =require('multer')

var path = require('path');
const dirPath = path.join(__dirname, '/public/Imagenes');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '/public')))



app.use(express.static('public'));

const storage=multer.diskStorage({
    destination: dirPath,
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
const upload= multer({storage:storage})


app.get('/estilista', async (req,res) =>{
    let estilista = await Estilista.find()
    res.json(estilista)
})

app.post('/estilista',upload.single("foto"), async(req,res)=>{
    const estilista= new Estilista({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        foto:req.file.originalname
    })
    await estilista.save()
    res.json({msg:"estilista creado"})
})
app.put('/estilista',upload.single("foto"), async(req,res)=>{
    Estilista.findById(req.body._id)
    .then((esti)=>{
        esti.nombre= req.body.nombre;
        esti.precio= req.body.precio;
        esti.descripcion= req.body.descripcion;
        esti.foto= req.file.originalname; 

        esti
        .save()
        .then(()=> res.json("Estilista Modificado"))
        .catch((err)=>res.json(err))
    })
})

app.delete('/estilista/:id', (req,res)=>{
    Estilista.findByIdAndDelete(req.params.id)
    .then(()=> res.json("Estilista Eliminado!"))
    .catch(err=> res.json(err))
})

app.get('/agenda', async(req,res)=>{
    let citas= await Usuario.find({}).sort({fecha:1}).exec()
    res.json(citas)
    
})

app.get('/agenda/:nom', async(req,res)=>{
    let trab= req.params.nom
    let agenda= await Usuario.find({estilista:trab})
    res.json(agenda)
})

app.get('/agenda/usuario/:nom',async(req,res)=>{
    let usu=req.params.nom
    let agenda = await Usuario.findOne({nombre:usu})
    res.json(agenda)
})



app.post('/agenda', async(req,res)=>{
    const {nombre,
        correo,
        fecha,
        descripcion,
        estilista,
        estado,
        servicioNom,
        hora,
        numero}= req.body
    const usuario= new Usuario({nombre,
        correo,
        fecha,
        descripcion,
        estilista,
        estado,
        servicioNom,
        hora,
        numero})
    await usuario.save()
    res.json({msg:"Cita creada"})
})

app.put('/agenda', async(req,res)=>{
    const {_id,estado}= req.body
    let actua= await Usuario.findByIdAndUpdate({_id},{estado},{returnOriginal:false})
    res.send('Modificado')
})

app.delete('/agenda/:id', (req,res)=>{
    Usuario.findByIdAndDelete(req.params.id)
    .then(()=> res.json("Servicio Eliminado!"))
    .catch(err=> res.json(err))
})




app.get('/servicio', async (req,res) =>{
    let servicio = await Servicio.find()
    res.json(servicio)
})

app.get('/servicio/:id', async (req,res)=>{
    let agenda= await Servicio.findById(req.params.id)
    res.json(agenda)
})

app.post('/servicio',upload.single("foto"), async(req,res)=>{
    const servicio= new Servicio({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        foto:req.file.originalname
    })
    await servicio.save()
    res.json({msg:"Servicio creado"})
})

app.put('/servicio',upload.single("foto"), async(req,res)=>{
    Servicio.findById(req.body._id)
    .then((servi)=>{
        servi.nombre= req.body.nombre;
        servi.precio= req.body.precio;
        servi.descripcion= req.body.descripcion;
        servi.foto= req.file.originalname; 

        servi
        .save()
        .then(()=> res.json("Servicio Modificado"))
        .catch((err)=>res.json(err))
    })
})

app.delete('/servicio/:id', (req,res)=>{
    Servicio.findByIdAndDelete(req.params.id)
    .then(()=> res.json("Servicio Eliminado!"))
    .catch(err=> res.json(err))
})



app.listen(5000,()=> console.log('Puerto 5000'))