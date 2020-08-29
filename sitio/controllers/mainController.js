const database = require('../data/database')

module.exports = {
    index: function(req, res){
    res.render('index', {
        title: 'Express',
        productos: database
        })
    }
}