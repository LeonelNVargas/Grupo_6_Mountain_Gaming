let dbUsuarios = require('../data/userDB')

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');

module.exports = {
    registro: function(req, res){
        res.render('users/registro')
    },
    registracion: function(req, res){
        let error = validationResult(req);
        let ultimoID = dbUsuarios.length + 1;
        if(error.isEmpty()){
            let nuevoUsuario = {
                id: ultimoID + 1,
                nombre: req.body.nombre,
                email: req.body.email,
                contrasenia: bcrypt.hashSync(req.body.contrasenia,10),
                rol: "usuario"
                };
            dbUsuarios.push(nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'usuarios.json'), JSON.stringify(dbUsuarios), 'utf-8');
            res.redirect('/');
        }else{
            res.render('users/registro',{
                error: errors.mapped(),
                old: req.body
            })
        }
    },
    perfil: function(req, res){
        res.send('Acá no hay nada')
    }
}