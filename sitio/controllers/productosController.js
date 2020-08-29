const database = require('../data/database');

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
    publicar: function(req,res){
        res.redirect('productos')
    }
}