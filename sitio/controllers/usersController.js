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
    perfil: function(req, res){
        res.send('Acá no hay nada')
    }
}