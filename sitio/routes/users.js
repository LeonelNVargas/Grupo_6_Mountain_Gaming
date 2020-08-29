const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

//registro
router.get('/registro', controller.registro);
router.post('/registro', controller.registracion);

//editar usuario

module.exports = router;
