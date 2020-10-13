let dbUsuarios = require('../data/userDB')

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');

//requiero sequelize
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
        if(errors.isEmpty()){
            db.Usuarios.create({
                nombre: req.body.nombre.trim(),
                email: req.body.email.trim(),
                telefono: undefined,
                direccion: undefined,
                contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                rol: "usuario"
            })
            .then(() =>{
                return res.redirect('/')
            })
            .catch(error => {
                console.log(error)
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
            db.Usuarios.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(usuario =>{
                req.session.usuario = {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                    telefono: undefined,
                    direccion: undefined,
                    rol: usuario.rol
                }
            res.cookie('usuarioMG', req.session.usuario,{maxAge: 1000 * 60 * 5})
            res.redirect('/')
            })
            .catch(errores => console.log(errores))
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
    profile:function(req,res){
            console.log(req.session.usuario)
            res.render('users/profile', {
              title: "Mi perfil",
              css: "profile.css",
              usuario: req.session.usuario
            })
        },
    editUser: function(req, res){
        res.render('users/editProfile', {
            title: "Editar usuario",
            css: "editUsuario.css",
            usuario: req.session.usuario
        })
    },
    processEditUser: function(req, res){
        db.Usuarios.update({
            name: req.body.nombre.trim(),
            email: req.body.email.trim(),
            telefono: req.body.telefono.trim(),
            direccion: req.body.direccion.trim()
        },
        {
            where:{
                id: req.params.id
            }
        })
        .then(resultado => {
            console.log(resultado)
            return res.redirect('/')
            })
        .catch(errores => {
            console.log(errores)
        })
    },
    logout: function(req, res){
        req.session.destroy();
        if(req.cookies.usuarioMG){
            res.cookie('usuarioMG','',{maxAge:-1})
        }
        return res.redirect('/')
    },
    delete: function(req, res){
        db.Usuarios.destroy({
            where: {
                id: req.session.usuario.id
            }
        })
        .then(() =>{
            req.session.destroy();
            if(req.cookies.usuarioMG){
                res.cookie('usuarioMG', '', {maxAge: -1})
                res.redirect('/')
            }
        })
        .catch(error => {
            console.log(error)
        })
    },
    listarusers: function(req, res){
        sequelize.query("SELECT * FROM usuarios")
        .then(function(resultados){
            let usuarios = resultados[0];
            res.send(usuarios)
        })
    }
}