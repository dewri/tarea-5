const body_parser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

//conexion a BD
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Contectado a la BD')) 
.catch(e => console.log('Error en la BD', e))
// modelo de datos
const Schema = mongoose.Schema;
const datosSchema = new Schema({
  nombre:  String,
  apellido: String,
  telefono: String
});
const dato = mongoose.model('dato',datosSchema);

// get-post
app.use(body_parser.json());
app.get('/muestra', async(request,response) =>{
    try {
        const datos_bd =await dato.find()
        //console.log(datos_bd)
        response.json(datos_bd);
    } catch (error) {
        console.log(error)
    }
});
app.post('/agrega', async(request,response) =>{
    const body = request.body;
    try {
        await dato.create(body)
        response.redirect('/muestra')
    } catch (error) {
        console.log(error)
    }
});

app.listen(3001);