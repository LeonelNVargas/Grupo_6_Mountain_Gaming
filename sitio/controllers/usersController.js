let dbUsuarios = require('../data/userDB')

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');

module.exports = {
    register: function(req, res){
        res.render('users/registro',{
            title: "Registro",
            css: "registro.css",
            usuario: req.session.usuario
        })
    },
    createUser: function(req, res){
        let errors = validationResult(req);
        let ultimoID = dbUsuarios.length + 1;
        if(errors.isEmpty()){
            let nuevoUsuario = {
                id: ultimoID + 1,
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: null,
                direccion: null,
                contrasenia: bcrypt.hashSync(req.body.contrasenia,10),
                rol: "usuario"
                };
            dbUsuarios.push(nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'usuarios.json'), JSON.stringify(dbUsuarios), 'utf-8');
            res.render('users/login',{
                title: "Login",
                css: "login.css",
                usuario: req.session.usuario
            })
        }else{
            res.render('users/registro',{
                title: "Registro",
                errors: errors.mapped(),
                old: req.body,
                css: "registro.css",
                usuario: req.session.usuario
            })
        }
    },
    login: function(req, res){
        res.render('users/login',{
            title: "Ingreso",
            css: "login.css",
            usuario: req.session.usuario
        })
    },
    processLogin: function(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsuarios.forEach(usuario => {
                if(usuario.mail == req.body.email){
                    req.session.usuario = {
                        id: usuario.id,
                        name: usuario.nombre,
                        email: usuario.email
                    }
                }
            });
            res.cookie('usuarioMG', req.session.usuario,{maxAge: 5000})
        res.redirect('/')
        }else{
            res.render('users/login',{
                title: "Ingreso",
                errors: errors.mapped(),
                css: "login.css",
                old: req.body,
                usuario: req.session.usuario
            })
        }
    },
    perfil: function(req, res){
        res.send('Acá no hay nada')
    },
    logout: function(req, res){
        req.session.destroy();
        if(req.cookies.usuarioMG){
            res.cookie('usuarioMG','',{maxAge:-1})
        }
        return res.redirect('/')
    }
}