const database = require('../data/database');
const fs = require('fs');
const path = require('path')
const {validationResult} = require('express-validator');

//traigo modelo de productos
const db = require('../database/models') 

module.exports = {
    todoslosproductos: function(req, res){
    res.render('productos', {
        title: "Nuestros productos",
        productos: database,
        usuario: req.session.usuario
        });
    },
    detalle: function(req, res){
        let idProducto = req.params.id;
        let producto = database.filter(producto => {
            return producto.id == idProducto
        })
        res.render('detalleProducto',{
            title: "Detalle de producto",
            id: idProducto,
            producto: producto[0],
            usuario: req.session.usuario
        });
    },
    agregar: function(req, res){
        res.render('registroProducto',{
            title: "Agrega un producto",
            css: "registroProduct.css",
            usuario: req.session.usuario
        })
    },
    publicar: function(req, res){
        let errores = validationResult(req);
        if(errores.isEmpty()){
            db.Productos.create({
                nombre: req.body.nombre.trim(),
                descripcion: req.body.descripcion,
                cantidad: Number(req.body.cantidad.trim()),
                precio: Number(req.body.precio.trim()),
                descuento: Number(req.body.descuento.trim()),
                id_categoria: req.body.categoria,
                imagen: (req.files[0])?req.files[0].filename:"noimage.png"
            })
            .then(resultado => {
                console.log(resultado);
                res.redirect('/');
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            db.Categorias.findAll({
                order: [
                    'nombre'
                ]
            })
            .then(categorias =>{
                let oldCategoria;
                if(req.body.categoria){
                    categorias.forEach(categoria =>{
                        if(categoria.id == req.body.categoria){
                            oldCategoria = categoria.nombre
                        }
                    });
                }
            })
        }
    },
    misproductos: function(req, res){
       let productos = database
        res.render('misproductos', {
            title: "Productos subidos",
            productos: productos,
            usuario: req.session.usuario
        })
    },
    editar: function(req, res){
        let idProducto = req.params.id;
        database.forEach(producto => {
            if (producto.id == idProducto){
                producto.id = Number(idProducto);
                producto.name = req.body.nombre;
                producto.price = Number(req.body.precio);
                producto.discount = Number(req.body.descuento);
                producto.category = req.body.categoria;
                producto.description = req.body.descripcion;
                producto.image = producto.image
            }
        })
        fs.writeFileSync(path.join(__dirname,"../data/productos.json"), JSON.stringify(database))
        res.redirect('/producto/misproductos')
    },
    edit: function(req, res){
        let editProduct = req.params.id;
        let producto = database.filter(producto => {
            return producto.id == editProduct
        })
        res.render('editarProducto', {
            title: "Editar productos",
            css: "editProducto.css",
            producto: producto[0]
        })
    },
    delete: function(req, res){
        let productDelete = req.params.id;
        database.forEach(producto => {
            if(producto.id == productDelete){
                let productoBorrado = database.indexOf(producto)
                database.splice(productoBorrado,1)
            }
        });
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(database))
        res.redirect('/producto/misproductos')
    }
}