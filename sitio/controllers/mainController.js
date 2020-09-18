const database = require('../data/database')
const userDB = require('../data/userDB')

module.exports = {
    index: function(req, res){
    res.render('index', {
        title: 'Mountain Gaming',
        productos: database,
        userDB: userDB
        })
    }
}