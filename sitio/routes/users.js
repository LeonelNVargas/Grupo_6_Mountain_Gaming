const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//registro
router.get('/registro', controller.registro);
router.post('/registro', controller.registracion);

//editar usuario

module.exports = router;
