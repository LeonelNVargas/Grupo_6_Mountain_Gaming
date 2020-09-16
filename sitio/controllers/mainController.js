const database = require('../data/database')

module.exports = {
    index: function(req, res){
    res.render('index', {
        title: 'Mountain Gaming',
        productos: database,
        rol: null,
        usuario:req.session.usuario
        })
    }
}