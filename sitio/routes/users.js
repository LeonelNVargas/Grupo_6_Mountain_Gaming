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
router.post('/login', /*loginValidator,*/ controller.processLogin);
//perfil
router.get('/profile', sessionUserCheck, controller.profile);
router.get('/profile/edit', controller.editUser);
router.put('/profile/:id/edit', controller.processEditUser);
router.delete('/profile/:id/delete', controller.delete);
//logout
router.get('/logout', controller.logout)
//prueba
router.get('/listausuarios', controller.listarusers)
module.exports = router;
