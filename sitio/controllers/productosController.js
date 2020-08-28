module.exports = {
    detalle: function(req, res){
        res.render('detalleProducto')
    },
    agregar: function(req, res){
        res.render('registroProducto')
    },
    productos: function(req, res){
        res.render('productos')
    },
    publicar: function(req,res){
        res.redirect('productos')
    }
}