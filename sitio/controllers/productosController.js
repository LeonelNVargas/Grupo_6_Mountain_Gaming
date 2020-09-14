const database = require('../data/database');
const fs = require('fs');
const path = require('path')

module.exports = {
    todoslosproductos: function(req, res){
    res.render('productos', {
        productos: database
        });
    },
    detalle: function(req, res){
        let idProducto = req.params.id;
        let producto = database.filter(producto => {
            return producto.id == idProducto
        })
        res.render('detalleProducto',{
            id: idProducto,
            producto: producto[0]
        });
    },
    agregar: function(req, res){
        res.render('registroProducto')
    },
    publicar: function(req, res){
        let ultimoProducto = 1;
        database.forEach(producto =>{
            if(producto.id > ultimoProducto){
                ultimoProducto = producto.id
            }
        })
        let nuevoProducto = {
            id: ultimoProducto + 1,
            name: req.body.nombre,
            price: req.body.precio,
            amount: req.body.cantidad,
            category: req.body.categoria,
            discount: req.body.descuento,
            description: req.body.descripcion,
            image: [(req.files[0])?req.files[0].filename:"noimage.png"]
        }
        database.push(nuevoProducto);
        fs.writeFileSync(path.join(__dirname,"..","data","productos.json"),JSON.stringify(database), 'utf-8')
        res.redirect('/producto/all')
    },
    misproductos: function(req, res){
       let productos = database
        res.render('misproductos', {
            productos: productos
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