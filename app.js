// Requires
var express = require('express');
var mongoose = require('mongoose');


//Inicializar Variables
var app = express();

//Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");

});


//Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    });
});

//Escuchar Peticiones
app.listen(3000, () => {
    // :  \x1b[32m%s\x1b[0m', 'texto'   sirve para poner en color verde en la consola
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})