const {check, validatorResult, body} = require('express-validator');
const dbUsuarios = require('../data/userDB');

module.exports = [
    check('nombre')
    .isLength({
        min:1
    })
    .withMessage('Ingresa un nombre válido'),
    
    check('email')
    .isEmail()
    .withMessage('Ingresa un mail válido'),
    
    body('email')
    .custom(function(value){
        console.log(value)

        let usuario = dbUsuarios.filter(user=>{
            return user.email == value
        })
        if(usuario == false){ 
            return true 
        }else{
            return false 
        }
     
    })
    .withMessage('Este email ya está registrado'),

    check('contrasenia')
    .isLength({
        min:4,
        max:20
    })
    .withMessage('La contraseña debe tener entre 4 y 20 caracteres'),

    body('contraseniaDos')
    .custom(function(value,{req}){
        if(value != req.body.contrasenia){
            return false
        }
        return true
    })
    .withMessage('Las contraseñas no coinciden')
]