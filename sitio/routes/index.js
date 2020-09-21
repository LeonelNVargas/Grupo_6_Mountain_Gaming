var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController')

//middlewares
const cookieCheck = require('../middlewares/cookieCheck')

/* GET home page. */
router.get('/', cookieCheck, mainController.index)
router.get('/nosotros', mainController.about)
router.get('/ayuda', mainController.help)

module.exports = router;
