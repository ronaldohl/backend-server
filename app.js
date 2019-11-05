// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar Variables
var app = express();


//Body Parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");

});


//Rutas para realizar peticion 
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Escuchar Peticiones
app.listen(3000, () => {
    // :  \x1b[32m%s\x1b[0m', 'texto'   sirve para poner en color verde en la consola
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})