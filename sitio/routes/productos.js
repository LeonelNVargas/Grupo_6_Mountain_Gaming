const express = require('express');
const router = express.Router();
const productos = require('../controllers/productosController');

router.get('/', productos.detalle)
router.get('/agregar', productos.agregar)
router.get('/all', productos.productos)

module.exports = router