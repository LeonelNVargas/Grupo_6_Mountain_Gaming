const {check, validatorResult, body} = require('express-validator');
const bcrypt = require('bcrypt')
const dbUsuarios = require('../data/userDB')

//sequelize: Requiero el modelo de Usuarios para luego verificar si existe un registro.
let db = require('../database/models')

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Ingresar email valido'),

    check('contrasenia')
    .isLength(1)
    .withMessage('Contraseña no valida')
]