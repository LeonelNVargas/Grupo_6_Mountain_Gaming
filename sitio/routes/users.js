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

router.get('/login', controller.login)
router.post('/login', loginValidator, controller.processLogin);

router.get('/perfil', sessionUserCheck, controller.perfil);

module.exports = router;
