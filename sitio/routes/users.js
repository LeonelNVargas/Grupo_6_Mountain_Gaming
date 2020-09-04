const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/', controller.perfil)

//registro
router.get('/registro', controller.registro);
router.post('/registro', controller.registracion);

module.exports = router;
