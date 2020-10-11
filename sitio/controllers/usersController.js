let dbUsuarios = require('../data/userDB')

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');

//sequelize
let db = require('../database/models');
let sequelize = db.sequelize;

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
                telefono: undefined,
                direccion: undefined,
                contrasenia: bcrypt.hashSync(req.body.contrasenia,10),
                rol: "usuario"
                };
            dbUsuarios.push(nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'usuarios.json'), JSON.stringify(dbUsuarios), 'utf-8');
            res.redirect('/user/login')
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
                if(usuario.email == req.body.email){
                    req.session.usuario = {
                        id: usuario.id,
                        name: usuario.nombre,
                        email: usuario.email
                    }
                }
            });
            res.cookie('usuarioMG', req.session.usuario,{maxAge: 1000 * 60 * 5})
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
    profile: function(req, res){
        res.render('users/profile', {
            title: "Mi perfil",
            dbUser: dbUsuarios,
            css: "profile.css",
            usuario: req.session.usuario
        })
    },
    editUser: function(req, res){
        res.send("hola")
    },
    logout: function(req, res){
        req.session.destroy();
        if(req.cookies.usuarioMG){
            res.cookie('usuarioMG','',{maxAge:-1})
        }
        return res.redirect('/')
    },
    prueba: function(req, res){
        sequelize.query("SELECT * FROM usuarios")
        .then(function(resultado){
            let usuarios = resultado[0];
            res.send(usuarios)
        })
    }
}