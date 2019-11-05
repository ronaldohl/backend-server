var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();



var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;


// ============================================================
//================ Obtener todos los usuarios=================
//=============================================================


//mandamos a llamar nuestra variable de express en este caso app y el metodo de la peticion despues especificamos donde va a estar la routa que en este ->
// -> caso ya solo pondremos '/' por que estamos en /usuario tambien recibimos un callback 
app.get('/', (req, res, next) => {


    Usuario.find({}, 'nombre email img role').exec( //Encontrar Usuario {//todos}, 'parametros mostrados' .exec ( (err,resp)=> )

        (err, usuarios) => {
            //Caso si recibimos un error
            if (err) {
                //retornamos un status 500 y un json 
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }

            //caso si no hay un error
            // Regresamos un status 200 y el json con los usuarios
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });

        });

});


// ============================================================
//================ Verificar Token por next ===================
//=============================================================
// app.use('/', (req, resp, next) => {
//     var token = req.query.token;
//     jwt.verify(token, SEED, (err, decoded) => {
//         if (err) {
//             return res.stauts(401).json({
//                 ok: false,
//                 mensaje: "Token no valido",
//                 errors: err
//             });
//         }
//         next();
//     });

// });




// ============================================================
//================ Crear usuario=================
//=============================================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });

});


// ============================================================
//================ Actualizar usuario=================
//=============================================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario",
                error: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error con el id " + id + " no existe",
                error: { message: 'No existe un usuario con ese ID' }
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)'
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});


// ============================================================
//================== Borrar usuario por id ====================
//=============================================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove((id), (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: " El usuario con el id: " + id + " no existe",
                error: { message: 'No existe un usuario con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });


});



module.exports = app;