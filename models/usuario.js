//Haciendo variable para hacer uso de mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var rolesValidos = {
        values: ['ADMIN_ROLE', 'USER_ROLE'],
        message: '{VALUE} no es un rol permitido'
    }
    //Obteniendo el Schema de mongoose
var Schema = mongoose.Schema;

// Declarando un nuevo Schema (tabla) 
//   var nombreTablaSchema =  new Schema ({
//      attr: {type: String, require:[true/false, 'Mensaje si no'], unique:true, default: 'abc' } 
//   });
// attr: 
var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, { mensaje: "{PATH} debe de ser unico" });
module.exports = mongoose.model('Usuario', usuarioSchema);