const {check, validatorResult, body} = require('express-validator');
const bcrypt = require('bcrypt')
const dbUsuarios = require('../data/userDB')

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Ingresar email valido'),

    check('contrasenia')
    .isLength(1)
    .withMessage('Contraseña no valida'),

    body('email')
    .custom(function(value){
        let usuario = dbUsuarios.filter(user => {
            return user.email == value
        })
        if(usuario == false){
            return false
        } else{
            return true
        }
    })
    .withMessage('El email no existe'),

    body('contrasenia')
    .custom((value,{req})=>{
        let resultado = true;
        dbUsuarios.forEach(usuario =>{
            if(usuario.email == req.body.email){
                if(!bcrypt.compareSync(value, usuario.contrasenia)){
                    resultado = false
                }
            }
        });
        if(resultado == false){
            return false
        } else {
            return true
        }
    })
    .withMessage("Contraseña incorrecta")
]