module.exports = {
    registro: function(req, res){
        res.render('registro')
    },
    registracion: function(req, res){
        let usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            contrasenia: req.body.contrasenia,
            confirmarcontrasenia: req.body.confirmarcontrasenia
        }
        res.render('registroExito');
    },
    ingreso: function(req, res){
        res.redirect('/')
    }
}