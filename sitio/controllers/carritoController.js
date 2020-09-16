module.exports = {
    carrito: function(req, res){
        res.render('carrito', {
            title: "Mi Carrito",
            css: "carrito.css"
        })
    }
}