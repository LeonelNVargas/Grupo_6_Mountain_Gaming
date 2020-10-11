const express = require('express');
const router = express.Router();

const controller = require('../controllers/usersController');

//middlewares
const sessionUserCheck = require('../middlewares/sessionUserCheck');
//validaciones
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

//registro
router.get('/register', controller.register);
router.post('/register', registerValidator, controller.createUser);
//ingreso
router.get('/login', controller.login)
router.post('/login', loginValidator, controller.processLogin);
//perfil
router.get('/profile', sessionUserCheck, controller.profile);
router.get('/editUser', sessionUserCheck, controller.editUser) //<--- Falta por hacer
//logout
router.get('/logout', controller.logout)
//prueba
router.get('/prueba', controller.prueba)
module.exports = router;
